import { createLogger, format, transports } from 'winston';
import a6_0x20be13 from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x44366c,
  message: _0x350c52,
  timestamp: _0x563db9
}) => {
  return _0x563db9 + " [" + _0x44366c + "]: " + _0x350c52;
});
class Logger {
  constructor() {
    this.logger = createLogger({
      'level': 'debug',
      'format': combine(timestamp({
        'format': "YYYY-MM-DD HH:mm:ss"
      }), colorize(), customFormat),
      'transports': [new transports.File({
        'filename': "log/app.log"
      })],
      'exceptionHandlers': [new transports.File({
        'filename': "log/app.log"
      })],
      'rejectionHandlers': [new transports.File({
        'filename': "log/app.log"
      })]
    });
  }
  ["info"](_0x3fedd6) {
    this.logger.info(_0x3fedd6);
  }
  ["warn"](_0x10901f) {
    this.logger.warn(_0x10901f);
  }
  ["error"](_0x24d1b5) {
    this.logger.error(_0x24d1b5);
  }
  ['debug'](_0x36f09e) {
    this.logger.debug(_0x36f09e);
  }
  ['setLevel'](_0x5c9749) {
    this.logger.level = _0x5c9749;
  }
  ["clear"]() {
    a6_0x20be13.truncate("log/app.log", 0x0, _0x48727f => {
      if (_0x48727f) {
        this.logger.error("Failed to clear the log file: " + _0x48727f.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();
