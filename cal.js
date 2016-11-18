; (() => {
  'use strict'

  // console.time('Total')

  const calendar = require('./calendar')

  var ArgumentParser = require('argparse').ArgumentParser
  var argParser = new ArgumentParser({
    version: '1.0.1',
    addHelp: true,
    description: 'Calendar printer'
  })
  argParser.addArgument('-Y', { help: 'Display a calendar for the current year. (Ignore other arguments)', action: 'storeTrue' })
  argParser.addArgument(['-x', '--extra'], { help: 'Display number of months before and after. Same as --before EXTRA --after EXTRA. (Default 0)' })
  argParser.addArgument('-3', { help: 'Display prev/current/next months. Same as --extra 1.', action: 'storeTrue' })
  argParser.addArgument(['-b', '--before'], { help: 'Display number of months before. (Default 0)' })
  argParser.addArgument(['-a', '--after'], { help: 'Display number of months after. (Default 0)' })
  argParser.addArgument(['-w', '--width'], { help: 'Display number of months per line. (Default 3)' })
  argParser.addArgument(['-m', '--month'], { help: 'The month (1-12) to display. (Default current month)', requred: false })
  argParser.addArgument(['-y', '--year'], { help: 'The year to display. (Default current year)', requred: false })

  const args = argParser.parseArgs()

  const now = new Date()
  let month = args.month ? --args.month : now.getMonth()
  let year = args.year || now.getFullYear()
  let width = args.width || 3

  let monthCount = 1
  if (args.Y) {
    month = 0
    monthCount = 12
  } else {
    let before = 0

    if (args['3']) {
      args.extra = 1
    }

    if (args.extra) {
      args.before = args.after = args.extra
    }

    if (args.before) {
      before = Number.parseInt(args.before, 10)
      monthCount += before
    }

    if (args.after) {
      monthCount += Number.parseInt(args.after, 10)
    }

    const firstMonth = new Date(year, month - before)
    month = firstMonth.getMonth()
    year = firstMonth.getFullYear()
  }

  const cal = calendar.buildCalendar(Number.parseInt(year, 10), Number.parseInt(month, 10), monthCount)
  calendar.dumpCalendar(cal, { across: width })

  // console.timeEnd('Total')
})()
