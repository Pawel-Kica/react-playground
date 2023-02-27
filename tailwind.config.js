/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: ['class'],
    theme: {
        extend: {
            screens: {
                xs: '475px',
            },
            colors: {
                cyan: {
                    m: '#679b9b',
                },
                orange: {
                    m: '#ff9a76',
                },
                stone: {
                    m: '#ffeadb',
                },
                gray: {
                    m: '#2c3e50',
                },
            },
            boxShadow: {
                m: '0 0 15px 1px rgb(0 0 0 / 40%)',
            },
            borderWidth: {
                1: '1px',
            },
        },
    },
    plugins: [],
};
