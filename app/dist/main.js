"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const logger_service_1 = require("./modules/logger/logger.service");
const logger_config_1 = require("./config/logger.config");
const bootstrap = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new logger_service_1.default(logger_config_1.default),
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, forbidUnknownValues: false }));
    app.enableCors({
        credentials: true,
        origin: true,
    });
    app.set('query parser', 'extended');
    const port = +process.env.SVC_PORT || 8080;
    const hostname = process.env.SVC_HOSTNAME || '0.0.0.0';
    await app.listen(port, hostname);
};
bootstrap();
//# sourceMappingURL=main.js.map