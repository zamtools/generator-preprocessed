# Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

module.exports = (grunt) ->
    require('grunt-load-tasks')(grunt)

    grunt.initConfig
        yeoman:
            app:     'app'
            static:  '<%%= yeoman.app %>/static'
            css:     '<%%= yeoman.static %>/styles'
            scripts: '<%%= yeoman.static %>/scripts'
            dist:    'dist'
            tmp:     '.tmp'
        watch:
            jade:
                files: ['<%%= yeoman.app %>/*.jade']
                tasks: ['jade:dev']
            less:
                files: ['<%%= yeoman.css %>/*.less']
                tasks: ['less:dev', 'autoprefixer:dev']
            coffee:
                files: ['<%%= yeoman.scripts %>/*.coffee']
                tasks: ['coffee:dev']
            livereload:
                options:
                    livereload: true
                files: [
                    '<%%= yeoman.app %>/*.html'
                    '<%%= yeoman.css %>/*.css'
                    '<%%= yeoman.scripts %>/*.js'
                ]
        connect:
            dev:
                options:
                    port: 9000
                    hostname: 'localhost'
                    base: '<%%= yeoman.app %>'
                    livereload: true
                    open: true
        jade:
            dev:
                options:
                    pretty: true
                files: [
                    expand: true
                    cwd:  '<%%= yeoman.app %>'
                    src:  '*.jade'
                    dest: '<%%= yeoman.app %>'
                    ext:  '.html'
                ]
        less:
            dev:
                files: [
                    expand: true
                    cwd:  '<%%= yeoman.css %>'
                    src:  '*.less'
                    dest: '<%%= yeoman.css %>'
                    ext:  '.css'
                ]
        autoprefixer:
            options:
                browsers: ['last 2 versions']
            dev:
                files: [
                    expand: true
                    cwd:  '<%%= yeoman.css %>'
                    src:  '*.css'
                    dest: '<%%= yeoman.css %>'
                ]
        coffee:
            dev:
                files: [
                    expand: true
                    cwd:  '<%%= yeoman.scripts %>'
                    src:  '*.coffee'
                    dest: '<%%= yeoman.scripts %>'
                    ext:  '.js'
                ]

    grunt.registerTask 'compile', ['jade:dev', 'less:dev', 'autoprefixer', 'coffee:dev']
    grunt.registerTask 'server', ['compile', 'connect:dev', 'watch']
    grunt.registerTask 'default', ['server']