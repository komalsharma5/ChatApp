
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Update this to match your file structure
    './public/index.html',             // If you're using HTML files in public
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
};
