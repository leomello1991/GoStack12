"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middleware/ensureAuthenticated"));
var ProvidersController_1 = __importDefault(require("../controllers/ProvidersController"));
var ProviderDayAvaliabityController_1 = __importDefault(require("../controllers/ProviderDayAvaliabityController"));
var ProviderMonthAvailabityController_1 = __importDefault(require("../controllers/ProviderMonthAvailabityController"));
var providersRouter = express_1.Router();
var providersController = new ProvidersController_1.default();
var providerDayAvaliabityController = new ProviderDayAvaliabityController_1.default();
var providerMonthAvaliabityController = new ProviderMonthAvailabityController_1.default();
providersRouter.use(ensureAuthenticated_1.default);
providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', providerDayAvaliabityController.index);
providersRouter.get('/:provider_id/day-availability', providerMonthAvaliabityController.index);
exports.default = providersRouter;
