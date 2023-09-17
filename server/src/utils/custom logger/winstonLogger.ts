import * as winston from 'winston';
import { DailyRotateFile } from 'winston/lib/winston/transports';

export class Logger {
  errorTransport: any = null;
  otherTransport: any = null;
  myFormat: winston.Logform.Format = null;
  createLoggerConfig: winston.LoggerOptions = null;

  constructor() {
    // Error transport (logs only errors)
    this.errorTransport = new DailyRotateFile({
      filename: 'logs/error_log-%DATE%.log',
      level: 'error', // Only error level logs go to this transport
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '1d',
    });

    // Other transport (logs levels below error)
    this.otherTransport = new DailyRotateFile({
      filename: 'logs/app_log-%DATE%.log',
      level: 'info', // Log levels below error (info, warn, debug, etc.)
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '1d',
    });

    // Custom log format tailored to our application's requirements
    this.myFormat = winston.format.printf(
      ({ level = 'info', message, timestamp, req, err, ...metadata }) => {
        if (!req) {
          req = { headers: {} };
        }

        let msg = `${timestamp} [${level}] : ${message} `;
        const json: any = {
          timestamp,
          level,
          ...metadata,
          message,
          error: {},
        };

        if (err) {
          json.error = err.stack || err;
        }

        msg = JSON.stringify(json);
        return msg;
      },
    );

    this.createLoggerConfig = {
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        this.myFormat,
      ),

      transports: [
        new winston.transports.Console({ level: 'info' }), // Console output for all levels
        this.errorTransport, // Error transport
        this.otherTransport, // Other transport
      ],
    };
  }
}
