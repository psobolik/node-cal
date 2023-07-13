; (() => {
  'use strict'

  // console.time('Total')

  const calendar = require('./calendar')

  const ArgumentParser = require('argparse').ArgumentParser
  const argParser = new ArgumentParser({
    add_help: true,
    description: 'Calendar printer'
  })
  argParser.add_argument('-Y', { help: 'Display a calendar for the current year. (Ignore other arguments)', action: 'store_true' })
  argParser.add_argument('-x', '--extra', { help: 'Display number of months before and after. Same as --before EXTRA --after EXTRA. (Default 0)' })
  argParser.add_argument('-3', { help: 'Display prev/current/next months. Same as --extra 1.', action: 'store_true' })
  argParser.add_argument('-b', '--before', { help: 'Display number of months before. (Default 0)' })
  argParser.add_argument('-a', '--after', { help: 'Display number of months after. (Default 0)' })
  argParser.add_argument('-w', '--width', { help: 'Display number of months per line. (Default 3)' })
  argParser.add_argument('-m', '--month', { help: 'The month (1-12) to display. (Default current month)', required: false })
  argParser.add_argument('-y', '--year', { help: 'The year to display. (Default current year)', required: false })
  argParser.add_argument('-v', '--version', { action: 'version', version: '1.3.0' })

  const args = argParser.parse_args()

  const now = new Date()
  let month = args.month ? --args.month : now.getMonth()
  let year = args.year || now.getFullYear()
  const width = args.width || 3

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

  const cal = calendar.buildCalendar(Number.parseInt(year, 10), month, monthCount)
  calendar.dumpCalendar(cal, { across: width })

  // console.timeEnd('Total')
})()
