module.exports = {
  server: {
    hostname: '0.0.0.0'
  },
  files: {
    javascripts: {
      joinTo: {
        'js/vendor.js': /^(?!app)/,
        'js/app.js': /^app/,
        'js/ghspa.js': ['vendor/js/ghspa.js']
      }
    },
    stylesheets: {
      joinTo: {
        'css/app.css': /^app/,
        'css/vendor.css': /^vendor/
      }
    },
    templates: {
      joinTo: 'js/app.js'
    }
  },
  plugins: {
    babel: {
      // Do not use ES6 compiler in vendor code
      ignore: [/web\/static\/vendor/, /node_modules/],
      presets: ['es2015']
    },
    handlebars: {
      include: {
        runtime: false
      }
    },
    sass: {
      mode: 'native'
    }
  }
};
