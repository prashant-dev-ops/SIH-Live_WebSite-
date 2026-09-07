import { IChatRepository, chatRepository } from "./chat.repository";
import { ChatMessage } from "./chat.types";

export class ChatFeatureService {
  constructor(private repo: IChatRepository = chatRepository) {}

  async getMessages(workerId: string): Promise<ChatMessage[]> {
    return this.repo.getMessages(workerId);
  }

  async sendCustomerMessage(
    workerId: string,
    text: string
  ): Promise<{ userMessage: ChatMessage; workerReplyPromise: Promise<ChatMessage> }> {
    const userMessage = await this.repo.sendMessage(workerId, text);

    const workerReplyPromise = new Promise<ChatMessage>((resolve) => {
      setTimeout(async () => {
        let reply = "Understood. I have verified all standard guild tools with me. You can pick your preferred time slot on my profile and book directly!";
        const lower = text.toLowerCase();
        if (lower.includes("today") || lower.includes("available")) {
          reply = "Yes, I am available today. Please check my slots on the booking page. My next opening is in 2 hours.";
        } else if (lower.includes("material") || lower.includes("parts") || lower.includes("buy")) {
          reply = "I carry standard copper cables, connectors, and sealants at wholesale cooperative rates. If you already have your own fixtures, I am happy to install those!";
        } else if (lower.includes("cost") || lower.includes("price") || lower.includes("charge")) {
          reply = "All our prices are fixed by the cooperative union with zero hidden charges. You can see the full itemized list and confirm your booking here.";
        }
        const replyMsg = await this.repo.receiveWorkerReply(workerId, reply);
        resolve(replyMsg);
      }, 1200);
    });

    return { userMessage, workerReplyPromise };
  }
}

export const chatFeatureService = new ChatFeatureService();
