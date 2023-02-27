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
                yellow: {
                    m: '#fefaf0',
                },
                stone: {
                    m: '#1b1e25',
                },
            },
        },
    },
    plugins: [],
};
