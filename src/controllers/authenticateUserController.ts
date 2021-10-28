import { Request, Response } from 'express';
import { AuthenticaUserService } from '../services/authenticateUserService';

class AuthenticaUserController {
  async handle(req: Request, res: Response) {
    const { code } = req.body;
    const service = new AuthenticaUserService();

    const result = await service.execute(code).then((result) => res.json(result))
    .catch((error) => console.log({ error: error.message }));

    return res.json(result);
  }
}

export { AuthenticaUserController };