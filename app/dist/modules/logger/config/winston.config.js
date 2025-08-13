"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const const_1 = require("../const");
const transports = [
    new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize({
            level: true,
            message: true,
        }), winston.format.timestamp({ format: const_1.TIMESTAMP_FORMAT }), winston.format.printf((info) => `${info.level}: [${info.context || info.stack || const_1.DEFAULT_APP_CONTEXT}] ${[info.timestamp]} ${info.message}`)),
    }),
];
exports.default = {
    transports,
};
//# sourceMappingURL=winston.config.js.map