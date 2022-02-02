import { createLogger, format, transports } from 'winston';

export default createLogger({
  format: format.combine(format.simple()),
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-api.log`
    }),
    new transports.Console({
      level: 'debug'
    })
  ]
});