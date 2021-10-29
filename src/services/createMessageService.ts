import prisma from '../prisma';
import { io } from '../app';

class CreateMessageService {

	async execute(text: string, user_id: string) {
		const message = await prisma.message.create({
			data: {
				text: text,
				userId: user_id,
			},
			include: {
				author: true,
			},
		});

		const inforWS = {
      text: message.text,
      user_id: message.userId,
      created_at: message.created_at,
      user: {
        name: message.author.name,
        avatar_url: message.author.avatar_url,
        email: message.author.email
      }
		}
		io.emit("new_message", inforWS);

		return message;
	}
}

export { CreateMessageService };
