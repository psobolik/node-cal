; (() => {
  'use strict'

  const dumpCalendar = (calendar, options) => {
    const sep = ' '
    const weekNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const across = Number.parseInt(options.across, 10) || 3
    const padding = Number.parseInt(options.padding, 10) || 2
    const cellWidth = padding + 1
    const lineLength = (cellWidth * 8) - 1
    const blankWeek = ' '.repeat(lineLength)
    const eow = ' '.repeat(padding)

    const countWeeks = (months) => {
      return months.reduce((weekCt, month, index, months) => {
        return Math.max(weekCt, month.weeks.length)
      }, 0)
    }

    const formatLine = (items, width) => {
      const formatItem = (value, width) => {
        const str = value.toString()
        let pad = str.length < width ? ' '.repeat(width - str.length) : ''
        return `${pad}${str}${sep}`
      }
      return (Array.from(items, (item) => {
        return formatItem(item, width)
      })).join('')
    }

    const dumpMonthHeaders = (months) => {
      const formatMonthHeader = (month) => {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const value = monthNames[month.month] + ' ' + month.year
        var vl = value.length
        var fl = Math.ceil((lineLength - vl - cellWidth) / 2)
        var rl = lineLength - fl - vl
        return blankWeek.substr(0, fl) + value + blankWeek.substr(0, rl)
      }
      months.forEach((month) => {
        process.stdout.write(formatMonthHeader(month))
      }, this)
      process.stdout.write('\n')
    }

    const dumpWeekHeaders = (months) => {
      months.forEach((month) => {
        process.stdout.write(formatLine(weekNames, padding))
        process.stdout.write(eow)
      }, this)
      process.stdout.write('\n')
    }

    let m = 0
    while (m < calendar.length) {
      let months = calendar.slice(m, m + across)
      m += across
      let weekCt = countWeeks(months)
      dumpMonthHeaders(months)
      dumpWeekHeaders(months)

      for (let weekIndex = 0; weekIndex < weekCt; ++weekIndex) {
        months.forEach((month) => {
          if (weekIndex < month.weeks.length) {
            let week = month.weeks[weekIndex]
            process.stdout.write(formatLine(week, padding))
            process.stdout.write(eow)
          } else {
            process.stdout.write(blankWeek)
          }
        }, this)
        process.stdout.write('\n')
      }
      process.stdout.write('\n')
    }
  }

  var buildCalendar = (year, firstMonth, monthCount) => {
    const buildMonthCalendar = (year, month) => {
      // console.log(`buildMonthCalendar(${year}, ${month})`)
      const getLastDay = (year, month) => {
        const lastDay = new Date(year, month + 1, 0)
        return lastDay.getDate()
      }
      const getFirstDay = (year, month) => {
        const date = new Date(year, month)
        return 1 - date.getDay()
      }
      let weeks = []

      var day = getFirstDay(year, month)
      const lastDay = getLastDay(year, month)
      while (day <= lastDay) {
        let days = []
        while (days.length < 7) {
          let dayStr = day > 0 && day <= lastDay ? day : ''
          days.push(dayStr)
          ++day
        }
        weeks.push(days)
      }
      return { year: year, month: month, weeks: weeks }
    }

    // console.log(`buildCalendar(${year}, ${month}, ${monthCount})`)
    let result = []
    for (let i = 0; i < monthCount; ++i) {
      const date = new Date(Number.parseInt(year, 10), Number.parseInt(firstMonth, 10) + i)
      result.push(buildMonthCalendar(date.getFullYear(), date.getMonth()))
    }
    return result
  }

  module.exports = { dumpCalendar: dumpCalendar, buildCalendar: buildCalendar }
})()
