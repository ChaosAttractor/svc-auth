"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var LoggerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const winston_loki_1 = require("winston-loki");
const moment = require("moment");
const const_1 = require("./const");
const winston_config_1 = require("./config/winston.config");
const isEmptyObject_1 = require("./utils/isEmptyObject");
let LoggerService = LoggerService_1 = class LoggerService extends common_1.ConsoleLogger {
    constructor(config) {
        super();
        this.config = config;
        const configCopy = { ...this.config };
        configCopy.winston = configCopy.winston || winston_config_1.default;
        if (configCopy.loki) {
            configCopy.winston.transports.push(new winston_loki_1.default(configCopy.loki));
        }
        this.winston = nest_winston_1.WinstonModule.createLogger(configCopy.winston);
    }
    log(message, context, data = {}, contextId = '') {
        this.logWrapper({
            message,
            data,
            context,
            method: "log",
            contextId,
        });
    }
    warn(message, context, data = {}, contextId = '') {
        this.logWrapper({
            message,
            data,
            context,
            method: "warn",
            contextId,
        });
    }
    error(message, context, data = {}, contextId = '') {
        this.logWrapper({
            message,
            data,
            context,
            method: "error",
            contextId,
        });
    }
    debug(message, context, data = {}, contextId = '') {
        this.logWrapper({
            message,
            data,
            context,
            method: "debug",
            contextId,
        });
    }
    logWrapper(loggerData) {
        const { method, message, data, context, contextId, } = loggerData;
        const ctx = LoggerService_1.getContext(context);
        const msg = LoggerService_1.buildMessage(message, data, contextId);
        this.winston[method](msg, ctx);
        if (method === "debug") {
            console.debug(`debug: [${ctx}] ${moment().format(const_1.TIMESTAMP_FORMAT)} ${msg}`);
        }
    }
    static getContext(context) {
        return context || const_1.DEFAULT_APP_CONTEXT;
    }
    static buildMessage(message, payload = {}, contextId = '') {
        if (typeof payload === 'string') {
            return `${message} || ${payload} || ${contextId}`;
        }
        const data = { ...payload };
        if (contextId) {
            data.contextId = contextId;
        }
        const dataString = data && !(0, isEmptyObject_1.default)(data) ? ` || ${JSON.stringify(data)}` : '';
        return `${message}${dataString}`;
    }
};
LoggerService = LoggerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(const_1.LOGGER_CONFIG)),
    __metadata("design:paramtypes", [Object])
], LoggerService);
exports.default = LoggerService;
//# sourceMappingURL=logger.service.js.map