/** @type {import('tailwindcss').Config} */
module.exports = {
    // mode: 'jit',
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        colors: {
            red: '#e63946',
            redwhite: '#ef8089',
            white: '#f1faee',
            bluewhite: '#a8dadc',
            blue: '#457b9d',
            bluedark: '#1d3557',
        },
    },
    plugins: [],
};
