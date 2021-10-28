import { Router } from 'express';
import { AuthenticaUserController } from '../controllers/authenticateUserController';
import { CreateMessageController } from '../controllers/createMessageController';
import { verifyAuthentication } from '../middlewares/verifyAuthentication';

const router = Router();

router.post('/authenticate', new AuthenticaUserController().handle);

router.post('/messages', verifyAuthentication, new CreateMessageController().handle);

export { router };