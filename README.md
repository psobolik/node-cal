cal
===

A console program to display calendars. Similar to the common Unix command, but with different arguments.

Build
=====
Requires [node and npm](https://nodejs.org).

```npm run build``` will install the necessary node modules and then copy the distribution files into a folder named `dist`.

You can then run the program by executing either `dist\cal\cal.cmd` from a Windows command line
or `dist/cal/cal` from a Linux/macOS shell.

Usage
=====
Requires [node](https://nodejs.org)

```
usage: cal [-h] [-v] [-Y] [-x EXTRA] [-b BEFORE] [-a AFTER] [-w WIDTH]
              [-m MONTH] [-y YEAR]

Optional arguments:
  -h, --help                    Show this help message and exit.
  -v, --version                 Show program's version number and exit.
  -Y                            Display a calendar for the current year.
                                (Ignore other arguments)
  -x EXTRA, --extra EXTRA       Display number of months before and after.
                                Same as --before EXTRA --after EXTRA.
                                (Default 0)
  -3                            Display prev/current/next months. Same
                                as --extra 1.
  -b BEFORE, --before BEFORE    Display number of months before. (Default 0)
  -a AFTER, --after AFTER       Display number of months after. (Default 0)
  -w WIDTH, --width WIDTH       Display number of months per line. (Default 3)
  -m MONTH, --month MONTH       The month (1-12) to display. (Default current month)
  -y YEAR, --year YEAR          The year to display. (Default current year)
  ```

License
=======
[ICS](LICENSE)
------
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
