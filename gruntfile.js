const { loadNpmTasks, registerTask } = require('grunt')

module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      development: {
        options: {
          style: 'compressed'
        },
        files: {
          'dev/styles/main.min.css': 'src/styles/main.scss'
        }
      },
      production: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/styles/main.min.css': 'src/styles/main.scss'
        }
      }
    },
    imagemin: {
      build: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [{removeViewBox: false}]
        },
        files: [{
            expand: true,
            cwd: 'src/assets',
            src: ['**/*.{png,jpg,svg}'],
            dest: 'dist/assets/'
        }]
      },
      dev: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [{removeViewBox: false}]
        },
        files: [{
            expand: true,
            cwd: 'src/assets',
            src: ['**/*.{png,jpg,svg}'],
            dest: 'dev/assets/'
        }]
      }
    },
    watch: {
      sass: {
        files: ['src/styles/**/*.scss'],
        tasks: ['sass:development']
      },
      html: {
        files: ['src/*.html'],
        tasks: ['replace:dev', 'htmlmin:dev']
      },
      uglify: {
        files: ['src/scripts/**/*.js'],
        tasks: ['uglify:dev']
      },
      replace: {
        files: ['src/index.html'],
        tasks: ['replace:dev']
      },
      imagemin: {
        files: ['src/assets/**/*'],
        tasks: ['imagemin:dev']
      }
    },
    replace: {
      dev: {
        options: {
          patterns: [
            {
              match: 'ENDERECO_DO_HOME_CSS',
              replacement: './styles/main.min.css'
            },
            {
              match: 'ENDERECO_DO_FRONT_CSS',
              replacement: './styles/pages/frontEnd/main.min.css'
            },
            {
              match: 'ENDERECO_DO_BACK_CSS',
              replacement: './styles/pages/backEnd/main.min.css'
            },
            {
              match: 'ENDERECO_DO_FULL_CSS',
              replacement: './styles/pages/fullStack/main.min.css'
            },
            {
              match: 'ENDERECO_DO_UXUI_CSS',
              replacement: './styles/pages/ux-ui/main.min.css'
            },
            {
              match: 'ENDERECO_DO_MAIN_JS',
              replacement: './scripts/main.min.js'
            },
            {
              match: 'ENDERECO_DO_FORM_JS',
              replacement: './scripts/form.min.css'
            },
            {
              match: 'ENDERECO_DO_FORM_MB_JS',
              replacement: './scripts/formMobile.min.css'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['src/index.html'],
            dest: 'dev/'
          }
        ]
      },
      dist: {
        options: {
          patterns: [
            {
              match: 'ENDERECO_DO_HOME_CSS',
              replacement: './styles/main.min.css'
            },
            {
              match: 'ENDERECO_DO_FRONT_CSS',
              replacement: './styles/pages/frontEnd/main.min.css'
            },
            {
              match: 'ENDERECO_DO_BACK_CSS',
              replacement: './styles/pages/backEnd/main.min.css'
            },
            {
              match: 'ENDERECO_DO_FULL_CSS',
              replacement: './styles/pages/fullStack/main.min.css'
            },
            {
              match: 'ENDERECO_DO_UXUI_CSS',
              replacement: './styles/pages/ux-ui/main.min.css'
            },
            {
              match: 'ENDERECO_DO_MAIN_JS',
              replacement: './scripts/main.min.js'
            },
            {
              match: 'ENDERECO_DO_FORM_JS',
              replacement: './scripts/form.min.css'
            },
            {
              match: 'ENDERECO_DO_FORM_MB_JS',
              replacement: './scripts/formMobile.min.css'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['prebuild/*.html'],
            dest: 'dist/'
          }
        ]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'prebuild/index.html': 'src/index.html',
          'prebuild/frontEnd.html': 'src/frontEnd.html',
          'prebuild/backEnd.html': 'src/backEnd.html',
          'prebuild/fullStack.html': 'src/fullStack.html',
          'prebuild/ux-ui.html': 'src/ux-ui.html',
        }
      },
      dev: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dev/index.html': 'src/index.html',
          'dev/frontEnd.html': 'src/frontEnd.html',
          'dev/backEnd.html': 'src/backEnd.html',
          'dev/fullStack.html': 'src/fullStack.html',
          'dev/ux-ui.html': 'src/ux-ui.html',
        }
      }
    },
    clean: ['prebuild'],
    uglify: {
      build: {
        src: 'src/scripts/*.js',
        dest: 'dist/scripts/main.min.js'
      },
      dev: {
        src: 'src/scripts/*.js',
        dest: 'dev/scripts/main.min.js'
      }
    }
  })

  loadNpmTasks('grunt-contrib-sass')
  loadNpmTasks('grunt-contrib-watch')
  loadNpmTasks('grunt-replace')
  loadNpmTasks('grunt-contrib-htmlmin')
  loadNpmTasks('grunt-contrib-clean')
  loadNpmTasks('grunt-contrib-uglify')
  loadNpmTasks('grunt-contrib-imagemin')

  registerTask('default', ['watch'])
  registerTask('build', [
    'sass:production',
    'htmlmin:dist',
    'replace:dist',
    'clean',
    'uglify:build',
    'imagemin:build'
  ])
}
