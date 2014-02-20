'user strict';

module.exports = function(grunt) {

    var styleFiles = grunt.file.readJSON('externalStyles.json'),
        externalScriptFiles = grunt.file.readJSON('externalScripts.json');

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            compile: {
                options: {
                    cleancss: true
                },
                files: { "styles/app.css" : styleFiles.concat('styles/**/*.less') }
            }
        },
        ngmin: {
            externalScripts: {
                files: {
                    "scripts/dist/externalScripts.js" : externalScriptFiles
                }
            },
            mainScript: {
                files: {
                    "scripts/dist/main.js": "scripts/main.js"
                }
            },
            controllers: {
                files: {
                    "scripts/dist/controllers.js": "scripts/controllers/**/*.js"
                }
            },
            services: {
                files: {
                    "scripts/dist/services.js" : "scripts/services/**/*.js"
                }
            },
            directives: {
                files: {
                    "scripts/dist/directives.js" : "scripts/directives/**/*.js"
                }
            }
        },
        uglify: {
            options: {
                report: 'min',
                mangle: true,
            },
            externalScripts: {
                files: {
                    "scripts/dist/externalScripts.min.js" : "scripts/dist/externalScripts.js"
                }
            },
            mainScript: {
                files: {
                    "scripts/dist/main.min.js" : "scripts/dist/main.js"
                }
            },
            controllers: {
                files: {
                    "scripts/dist/controllers.min.js" : "scripts/dist/controllers.js"
                }
            },
            services: {
                files: {
                    "scripts/dist/services.min.js" : "scripts/dist/services.js"
                }
            },
            directives: {
                files: {
                    "scripts/dist/directives.min.js" : "scripts/dist/directives.js"
                }
            }
        },
        concat: {
            dist: {
                files: {
                    'scripts/app.js': [
                        'scripts/dist/externalScripts.min.js',
                        'scripts/dist/main.min.js',
                        'scripts/dist/controllers.min.js',
                        'scripts/dist/services.min.js',
                        'scripts/dist/directives.min.js'
                    ]
                }
            }
        },
        clean: {
            files: ['scripts/dist']
        },
        watch: {
            options: {
                livereload: true
            },
            less: {
                files: ['styles/*.less'],
                tasks: ['less']
            },
            html: {
                files: ['index.html', 'views/**/*.html'],
            },
            mainScript: {
                files: ['scripts/main.js'],
                tasks: ['ngmin:mainScript', 'uglify:mainScript', 'concat'],
            },
            controllers: {
                files: ['scripts/controllers/*.js'],
                tasks: ['ngmin:controllers', 'uglify:controllers', 'concat'],
            },
            services: {
                files: ['scripts/services/*.js'],
                tasks: ['ngmin:services', 'uglify:services', 'concat'],
            },
            directives: {
                files: ['scripts/directives/*.js'],
                tasks: ['ngmin:directives', 'uglify:directives', 'concat'],
            }
        },
    });

    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['clean', 'less', 'ngmin', 'uglify', 'concat']);

};
