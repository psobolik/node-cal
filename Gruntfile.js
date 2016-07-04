module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      dist: {
        files: [
          { src: 'cal.js', dest: 'dist/cal/app/' },
          { src: 'calendar.js', dest: 'dist/cal/app/' },
          { src: 'README.md', dest: 'dist/cal/app/' },
          { src: 'cmd/cal', dest: 'dist/cal/cal' },
          { src: 'cmd/cal.cmd', dest: 'dist/cal/cal.cmd' },
          {
            expand: true,
            cwd: 'node_modules/argparse/',
            src: ['**/*'],
            dest: 'dist/cal/node_modules/argparse/'
          }, {
            expand: true,
            cwd: 'node_modules/sprintf-js/',
            src: ['**/*'],
            dest: 'dist/cal/node_modules/sprintf-js/'
          }]
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('default', ['copy'])
}
