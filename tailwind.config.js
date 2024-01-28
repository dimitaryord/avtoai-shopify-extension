module.exports = { // change to export default if you're using Tailwind CSS v3.0+
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'background-image': "url('/background.png')"
      }
    },
  },
  plugins: [],
}
