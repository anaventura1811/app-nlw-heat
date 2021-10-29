import { Router } from 'express';
import { AuthenticaUserController } from '../controllers/authenticateUserController';
import { CreateMessageController } from '../controllers/createMessageController';
import { GetLastMessageController } from '../controllers/getLastMessagesController';
import { ProfileUserController } from '../controllers/profileUserController';
import { verifyAuthentication } from '../middlewares/verifyAuthentication';

const router = Router();

router.post('/authenticate', new AuthenticaUserController().handle);

router.post('/messages', verifyAuthentication, new CreateMessageController().handle);

router.get('/messages/last', new GetLastMessageController().handle);

router.get('/profile', verifyAuthentication, new ProfileUserController().handle)

export { router };
