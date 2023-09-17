module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'cookie': ['Cookie', 'cursive'],
     },
     backgroundImage: {
      'hero-image': "url('./img/hero-bg.jpg')",
     }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
