module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      dist: {
        files: [
          { src: 'cal.js', dest: 'dist/app/' },
          { src: 'calendar.js', dest: 'dist/app/' },
          { src: 'README.md', dest: 'dist/app/' },
          { src: 'cmd/cal', dest: 'dist/cal' },
          { src: 'cmd/cal.cmd', dest: 'dist/cal.cmd' },
          {
            expand: true,
            cwd: 'node_modules/argparse/',
            src: ['**/*'],
            dest: 'dist/node_modules/argparse/'
          }, {
            expand: true,
            cwd: 'node_modules/sprintf-js/',
            src: ['**/*'],
            dest: 'dist/node_modules/sprintf-js/'
          }]
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('default', ['copy'])
}
