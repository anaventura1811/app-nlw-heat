import { Request, Response } from 'express';
import { GetLastMessageService } from '../services/getLastMessagesService';

class GetLastMessageController {
  async handle(_req: Request, res: Response) {
    const service = new GetLastMessageService();

    const result = await service.execute().then((data) => res.json(data))
    .catch((error) => res.json({ error: error.message }));

    return result;
  }
};

export { GetLastMessageController };