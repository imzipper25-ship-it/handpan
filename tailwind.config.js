/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Axiforma', 'Manrope', 'sans-serif'],
                display: ['Axiforma', 'Manrope', 'sans-serif'],
            },
            colors: {
                cream: '#FAF8F5',
                wood: {
                    light: '#8C7E6F',
                    DEFAULT: '#4A4036',
                    dark: '#2E261F',
                },
                sage: {
                    light: '#BCC9B9',
                    DEFAULT: '#8FA290',
                    dark: '#6B7C6C',
                },
                stone: '#D6D0C4',
            },
            backgroundImage: {
                'hero-pattern': "url('/assets/images/hero.png')",
            }
        },
    },
    plugins: [],
}
