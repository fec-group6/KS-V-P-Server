var path = require('path');
var source = path.join(__dirname, '/client/components');
var dest = path.join(__dirname, '/public');

module.exports = {
  entry: `${source}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: dest
  },
  module: {
    rules: [
      {
        test: /\.(jsx)$/,
        include: source,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        }]
      }
    ]
  }
};

// ,
//         {
//           loader: 'stylelint-custom-processor-loader'
//         }