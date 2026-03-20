// virtual-handpan.js

document.addEventListener('DOMContentLoaded', () => {
    // ─── Translations Helper ──────────────────────────────────────────────────
    function t(key, defaultText) {
        if (typeof translations !== 'undefined') {
            const lang = localStorage.getItem('lang') || 'pt';
            if (translations[lang] && translations[lang][key]) {
                return translations[lang][key];
            }
            if (translations['pt'] && translations['pt'][key]) {
                return translations['pt'][key];
            }
        }
        return defaultText;
    }

    // ─── UI Elements ──────────────────────────────────────────────────────────
    const emailScreen    = document.getElementById('email-screen');
    const tutorialScreen = document.getElementById('tutorial-screen');
    const gameScreen     = document.getElementById('game-screen');
    const outroScreen    = document.getElementById('outro-screen');

    const emailForm      = document.getElementById('email-form');
    const submitBtn      = emailForm.querySelector('button[type="submit"]');
    const sequenceDisplay = document.getElementById('sequence-display');
    const replayBtn      = document.getElementById('replay-btn');

    const notesBtns      = Array.from(document.querySelectorAll('.note-btn'));

    // ─── Audio ────────────────────────────────────────────────────────────────
    let audioCtx  = null;
    let reverbNode = null;
    const audioBuffers = {};
    const TOTAL_NOTES  = 9;
    let samplesReady   = false;

    // Build a simple reverb impulse response procedurally (avoids external files)
    function buildImpulse(ctx, duration = 2.0, decay = 2.0) {
        const rate    = ctx.sampleRate;
        const length  = rate * duration;
        const impulse = ctx.createBuffer(2, length, rate);
        for (let ch = 0; ch < 2; ch++) {
            const channel = impulse.getChannelData(ch);
            for (let i = 0; i < length; i++) {
                channel[i] = (Math.random() * 2 - 1) *
                             Math.pow(1 - i / length, decay);
            }
        }
        return impulse;
    }

    function initReverb() {
        reverbNode = audioCtx.createConvolver();
        reverbNode.buffer = buildImpulse(audioCtx, 2.0, 3.0);

        // Dry/wet: mix 25% wet to keep sound tight
        const wetGain = audioCtx.createGain();
        wetGain.gain.value = 0.25;
        reverbNode.connect(wetGain);
        wetGain.connect(audioCtx.destination);
    }

    // Load all 9 samples in PARALLEL
    async function loadSamples() {
        const fetches = Array.from({ length: TOTAL_NOTES }, (_, i) =>
            fetch(`assets/audio/handpan_${i}.mp3`)
                .then(r => {
                    if (!r.ok) throw new Error(`HTTP ${r.status}`);
                    return r.arrayBuffer();
                })
                .then(buf => audioCtx.decodeAudioData(buf))
                .then(decoded => { audioBuffers[i] = decoded; })
                .catch(() => { /* fallback to synth for this note */ })
        );
        await Promise.all(fetches);
        samplesReady = true;
    }

    // Create & initialize AudioContext on first user gesture
    async function initAudio() {
        if (audioCtx) return;
        const AC = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AC();
        initReverb();
        await loadSamples();
    }

    // ─── Synthesis fallback (if a sample is missing) ──────────────────────────
    function synthesizeNote(index) {
        const freqs = [146.83, 220.00, 261.63, 293.66, 329.63,
                       349.23, 392.00, 440.00, 523.25];
        const freq = freqs[index] || 440;
        const t    = audioCtx.currentTime;

        const osc    = audioCtx.createOscillator();
        const osc2   = audioCtx.createOscillator();
        const gain   = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type  = 'triangle';
        osc2.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        osc2.frequency.setValueAtTime(freq * 2.5, t);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3000, t);
        filter.frequency.exponentialRampToValueAtTime(300, t + 1.5);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.7, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);

        osc.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        if (reverbNode) gain.connect(reverbNode); // add reverb

        osc.start(t);  osc2.start(t);
        osc.stop(t + 2.5); osc2.stop(t + 2.5);
    }

    // ─── Play note ────────────────────────────────────────────────────────────
    function playNoteAudio(index) {
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();

        if (audioBuffers[index]) {
            const source   = audioCtx.createBufferSource();
            source.buffer  = audioBuffers[index];

            const dryGain  = audioCtx.createGain();
            dryGain.gain.value = 1.0;

            source.connect(dryGain);
            dryGain.connect(audioCtx.destination);

            if (reverbNode) {
                source.connect(reverbNode); // wet signal already mixed inside reverbNode chain
            }

            source.start(0);
        } else {
            synthesizeNote(index);
        }
    }

    // ─── Screen switch ────────────────────────────────────────────────────────
    function showScreen(screenEl) {
        document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
        setTimeout(() => {
            document.querySelectorAll('.screen').forEach(el => el.classList.add('hidden'));
            screenEl.classList.remove('hidden');
            void screenEl.offsetWidth; // reflow
            screenEl.classList.add('active');
        }, 100);
    }

    // ─── Game Logic ───────────────────────────────────────────────────────────
    // Melody: alternates L/R positions nicely for both thumbs
    // 0=Ding(C), 5=F(R near), 3=D(L outer), 6=G(R mid), 2=C(L mid),
    // 4=E(R outer), 1=A(L near), 7=A(R top), 8=C(top)
    const levelSequence = [0, 5, 3, 6, 2, 4, 1, 7, 0, 5, 3, 6];
    let currentStep = 0;

    function updateSequenceUI() {
        // Show only a window of ±3 notes for readability
        const window = 5;
        const start  = Math.max(0, currentStep - 1);
        const end    = Math.min(levelSequence.length, start + window);

        const text = levelSequence.slice(start, end).map((val, idx) => {
            const absIdx = start + idx;
            if (absIdx === currentStep)      return `<span class="highlight">${val}</span>`;
            if (absIdx < currentStep)        return `<span class="dimmed">${val}</span>`;
            return `<span>${val}</span>`;
        }).join(' · ');

        sequenceDisplay.innerHTML = text;

        // Pulse the target note
        notesBtns.forEach(btn => btn.classList.remove('target-pulse'));
        if (currentStep < levelSequence.length) {
            const target = document.querySelector(
                `.note-btn[data-note="${levelSequence[currentStep]}"]`
            );
            if (target) target.classList.add('target-pulse');
        }
    }

    function startGame() {
        currentStep = 0;
        updateSequenceUI();
    }

    function checkTap(noteIndex) {
        if (currentStep >= levelSequence.length) return;

        if (noteIndex === levelSequence[currentStep]) {
            currentStep++;
            updateSequenceUI();

            if (currentStep >= levelSequence.length) {
                setTimeout(() => showScreen(outroScreen), 1000);
            }
        } else {
            // Wrong note feedback
            if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
        }
    }

    // ─── Email Form ───────────────────────────────────────────────────────────
    emailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('user-email').value.trim();
        if (!email) return;

        // Loading state
        submitBtn.textContent = t('vh.loading', 'A carregar...');
        submitBtn.disabled = true;

        console.log('Email captured:', email);

        await initAudio(); // must happen inside user gesture for iOS

        submitBtn.textContent = t('vh.start', 'Começar');
        submitBtn.disabled = false;

        showScreen(tutorialScreen);
        setTimeout(() => {
            showScreen(gameScreen);
            startGame();
        }, 2500);
    });

    replayBtn.addEventListener('click', () => {
        showScreen(gameScreen);
        startGame();
    });

    // ─── Touch Handling (Multi-touch) ─────────────────────────────────────────
    notesBtns.forEach(btn => {
        btn.addEventListener('touchstart', async (e) => {
            e.preventDefault();

            if (!audioCtx) await initAudio();

            for (let i = 0; i < e.changedTouches.length; i++) {
                const noteIndex = parseInt(btn.getAttribute('data-note'), 10);

                btn.classList.add('active');

                if (navigator.vibrate) navigator.vibrate(20);

                playNoteAudio(noteIndex);
                checkTap(noteIndex);
            }
        }, { passive: false });

        const removeActive = (e) => {
            e.preventDefault();
            btn.classList.remove('active');
        };

        btn.addEventListener('touchend',   removeActive, { passive: false });
        btn.addEventListener('touchcancel', removeActive, { passive: false });
    });

    // ─── Click fallback for desktop testing ───────────────────────────────────
    notesBtns.forEach(btn => {
        btn.addEventListener('mousedown', async (e) => {
            if (!audioCtx) await initAudio();
            const noteIndex = parseInt(btn.getAttribute('data-note'), 10);
            btn.classList.add('active');
            playNoteAudio(noteIndex);
            checkTap(noteIndex);
            setTimeout(() => btn.classList.remove('active'), 200);
        });
    });
});
