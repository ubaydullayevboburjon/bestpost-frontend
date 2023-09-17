module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-preset-env': {
      features: {
        'nesting-rules': true, // Enable CSS nesting in Sass
      },
    },
  },
};
