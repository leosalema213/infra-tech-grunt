const { loadNpmTasks, registerTask } = require("grunt");

module.exports = (grunt) => {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            development: {
                options:{
                    style:'compressed'
                },
                files:{
                    'dev/styles/main.min.css':'src/styles/main.scss'
                }
            },
            production: {
                options: {
                    style: 'compressed'
                },
                files:{
                    'dist/styles/main.min.css':'src/styles/main.scss',
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
            },
            uglify: {
                files:['src/scripts/**/*.js'],
                tasks:['uglify:dev']
            }
        },
        replace:{
            dev: {
                options: {
                    patterns:[
                        {
                            match: 'ENDERECO_DO_HOME_CSS',
                            replacement:'./styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_MAIN_JS',
                            replacement:'./styles/main.min.js'
                        },
                        {
                            match: 'ENDERECO_DO_FORM_JS',
                            replacement:'./styles/form.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_FORM_MB_JS',
                            replacement:'./styles/formMobile.min.css'
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
                            replacement:'./styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_MAIN_JS',
                            replacement:'./styles/main.min.js'
                        },
                        {
                            match: 'ENDERECO_DO_FORM_JS',
                            replacement:'./styles/form.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_FORM_MB_JS',
                            replacement:'./styles/formMobile.min.css'
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
            },
            dev: {
                options:{
                    removeComments:true,
                    collapseWhitespace:true
                },
                files:{
                    'dev/index.html' : 'src/index.html'
                }
            }
        },
        clean: [
            'prebuild'
        ],
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

    loadNpmTasks('grunt-contrib-sass');
    loadNpmTasks('grunt-contrib-watch');
    loadNpmTasks('grunt-replace');
    loadNpmTasks('grunt-contrib-htmlmin');
    loadNpmTasks('grunt-contrib-clean');
    loadNpmTasks('grunt-contrib-uglify');

    registerTask('default',['watch']);
    registerTask('build', ['sass:production', 'htmlmin:dist','replace:dist','clean','uglify:build'])
}
