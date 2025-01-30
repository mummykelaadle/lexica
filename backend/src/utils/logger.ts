import winston from 'winston';
import path from 'path';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Define log transports (where logs will be stored)
const transports = [
  // Log to console
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      format
    ),
  }),

  // Log errors to a separate file
  new winston.transports.File({
    filename: path.join(__dirname, '../../logs/error.log'),
    level: 'error',
    format,
  }),

  // Log all logs to a combined file
  new winston.transports.File({
    filename: path.join(__dirname, '../../logs/app.log'),
    format,
  }),
];

// Create the logger
const logger = winston.createLogger({
  levels,
  format,
  transports,
});

export default logger;
