import { Router } from 'express';
import { AuthenticaUserController } from '../controllers/authenticateUserController';

const router = Router();

router.post('/authenticate', new AuthenticaUserController().handle);

export { router };