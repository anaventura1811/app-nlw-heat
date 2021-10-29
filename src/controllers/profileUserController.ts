import { Request, Response } from "express";
import { ProfileUserService } from "../services/profileUserService";

class ProfileUserController {

  async handle(req: Request, res: Response) {
  
    const { user_id } = req;

    const service = new ProfileUserService();

    const result = await service.execute(user_id).then((data) => res.json(data))
    .catch((e) => res.json({ err: e.message }));

    return result;
  }
}

export { ProfileUserController };