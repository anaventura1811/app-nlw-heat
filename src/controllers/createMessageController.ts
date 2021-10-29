import { Request, Response } from 'express';
import { CreateMessageService } from '../services/createMessageService';
import { io } from '../app';

class CreateMessageController {
  async handle(req: Request, res: Response) {
    const { text } = req.body;

    const { user_id } = req;

    const service = new CreateMessageService();

    const result = await service.execute(text, user_id)
			.then((result) => res.json(result))
			.catch((error) => console.log({ error: error.message }));
		return result;
  }
}

export { CreateMessageController };
