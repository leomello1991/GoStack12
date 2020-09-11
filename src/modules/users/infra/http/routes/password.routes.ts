import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPassworController from '../controllers/ResetPasswordController'



const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController()
const resetPassworController = new ResetPassworController()


passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPassworController.create)

export default passwordRouter;
