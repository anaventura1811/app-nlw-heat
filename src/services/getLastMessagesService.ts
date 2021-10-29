import prisma from "../prisma";

class GetLastMessageService {
  async execute() {
    const messages = await prisma.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc"
      },
      include: {
        author: true,
      }
    });

    return messages;
  }
};

export { GetLastMessageService };