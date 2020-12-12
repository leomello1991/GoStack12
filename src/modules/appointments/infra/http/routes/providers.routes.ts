import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ProviderController from '../controllers/ProvidersController';
import ProviderDayAvaliabityController from '../controllers/ProviderDayAvaliabityController';
import ProviderMonthAvaliabityController from '../controllers/ProviderMonthAvailabityController';

const providersRouter = Router();

const providersController = new ProviderController();
const providerDayAvaliabityController = new ProviderDayAvaliabityController();
const providerMonthAvaliabityController = new ProviderMonthAvaliabityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerDayAvaliabityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerMonthAvaliabityController.index,
);

export default providersRouter;
