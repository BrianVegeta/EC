module.exports = {
  parser: 'precss',
  plugins: [
    require('precss'),
    require('autoprefixer'),
    require('postcss-math'),
  ],
};
