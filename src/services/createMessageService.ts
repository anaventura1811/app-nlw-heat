import prisma from '../prisma';

class CreateMessageService {

	async execute(text: string, user_id: string) {
    const message = await prisma.message.create({
      data: {
        text,
        userId: user_id,
      },
      include: {
        author: true,
      }
    });

    return message;
  }
}

export { CreateMessageService };
