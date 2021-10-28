import { Request, Response } from 'express';
import { AuthenticaUserService } from '../services/authenticateUserService';

class AuthenticaUserController {
  async handle(req: Request, res: Response) {
    

    const service = new AuthenticaUserService();
    // service.execute();
  }
}

export { AuthenticaUserController };