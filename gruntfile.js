const { loadNpmTasks } = require("grunt");

module.exports = (grunt) => {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            development: {
                options:{
                    style:'compressed'
                },
                files:{
                    'dist/styles/main.min.css':'src/styles/main.scss'
                }
            },
            production: {
                options: {
                    style: 'compressed'
                },
                files:{
                    'dist/styles/main.min.css':'src/styles/main.scss'
                }
            }
        },
        watch: {
            sass: {
                files:['src/styles/**/*.scss'],
                tasks:['sass:development']
            },
            html:{
                files:['src/index.html'],
                tasks:['replace:dev']
            }
        },
        replace:{
            dev: {
                options: {
                    patterns:[
                        {
                            match: 'ENDERECO_DO_HOME_CSS',
                            replacement:'./styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_MAIN_JS',
                            replacement:'./styles/main.js'
                        },
                        {
                            match: 'ENDERECO_DO_FORM_JS',
                            replacement:'./styles/form.css'
                        },
                        {
                            match: 'ENDERECO_DO_FORM_MB_JS',
                            replacement:'./styles/formMobile.css'
                        }
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten:true,
                        src:['src/index.html'],
                        dest:'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns:[
                        {
                            match: 'ENDERECO_DO_HOME_CSS',
                            replacement:'./styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_MAIN_JS',
                            replacement:'./styles/main.js'
                        },
                        {
                            match: 'ENDERECO_DO_FORM_JS',
                            replacement:'./styles/form.css'
                        },
                        {
                            match: 'ENDERECO_DO_FORM_MB_JS',
                            replacement:'./styles/formMobile.css'
                        }
                    ]
                },
                files:[
                    {
                        expand: true,
                        flatten: true,
                        src:['prebuild/index.html'],
                        dest:'dist/'
                    }
                ]
            }
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments:true,
                    collapseWhitespace:true
                },
                files:{
                    'prebuild/index.html' : 'src/index.html'
                }
            }
        },
        clean: [
            'prebuild'
        ],
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js' : 'src/scripts/main.js'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default',['watch']);
    grunt.registerTask('build', ['sass:production', 'htmlmin:dist','replace:dist','clean','uglify'])
}
