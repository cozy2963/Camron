module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-imageoptim');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-responsive-images');


  grunt.initConfig({
  htmlmin: {                                     // Task
    dist: {                                      // Target
      options: {                                 // Target options
        removeComments: true,
        collapseWhitespace: true
      },
      files: {                                   // Dictionary of files
        'dest/index.html': 'index.html',
        'dest/project-2048.html': 'project-2048.html',
        'dest/project-mobile.html': 'project-mobile.html',
        'dest/project-webperf.html': 'project-webperf.html',
        'dest/pizza.html': 'views/pizza.html',
             // 'destination': 'source'
      }
    }
  },
  concat: {
    options: {
      separator: ';',
    },
    dist: {
      src: ['js/perfmatters.js', 'views/js/main.js'],
      dest: 'dest/js/built.js',
    }
  },
  jshint: {
      all: ['Gruntfile.js','js/*.js', 'views/js/*.js']
  },
  uglify: {
    my_target: {
      files: {
        'dest/js/built.min.js': ['dest/js/built.js']
      }
    }
  },
  cssmin: {
    my_target: {
      files: [{
          expand: true,
          cwd: 'views/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'dest/cssviews/',
          ext: '.css'


    }]
  }
},

responsive_images: {
     dev: {
       options: {
         engine: 'im',
         sizes: [{
           width: 400,
           suffix: '_large',
           quality: 50
         }]
       },

       /*
       You don't need to change this part if you don't change
       the directory structure.
       */
       files: [{
         expand: true,
         src: ['*.{gif,jpg,png}'],
         cwd: 'views/images',
         dest: 'dest/min'
       }]
     }
   },


imagemin: {
  options: {
    optimizationLevel: 3
  },
    dynamic: {
      files: [{
        expand: true,
        cwd: 'views/images/',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'dest/'
      }]
    }
  },

imageoptim: {
myTask: {
  options: {
    jpegMini: false,
    imageAlpha: true,
    quitAfter: true
  },
  src: ['views/imgages'],
}
}
});

grunt.registerTask('default', [
  'jshint',
  'imagemin',
  'htmlmin',
  'concat',
  'uglify',
  'cssmin',
  'imageoptim',
  'responsive_images'
]);
};
