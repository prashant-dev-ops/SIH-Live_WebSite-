import { ChatMessage } from "./chat.types";

export interface IChatRepository {
  getMessages(workerId: string): Promise<ChatMessage[]>;
  sendMessage(workerId: string, text: string): Promise<ChatMessage>;
  receiveWorkerReply(workerId: string, text: string): Promise<ChatMessage>;
}

const CHAT_STORAGE_PREFIX = "sevasaathi_chat_";

export class MockChatRepository implements IChatRepository {
  private initialWelcomes: Record<string, string> = {
    "w-1": "Namaste! I am Ramesh Kumar, master wireman with Bangalore Urban Cooperative. How can I help with your electrical work today?",
    "w-2": "Namaste! Suresh Sharma here. Let me know what plumbing or pipe leakage repair you need assistance with.",
    "w-3": "Hello! Manoj Vishwakarma here. Are you looking for furniture repair, lock installation, or modular fittings?",
    "w-4": "Namaste! Rajesh Verma here. Tell me about your room refresh or wall waterproofing requirement.",
    "w-5": "Namaste! Sunita Devi here with Mahila Pragati Cooperative. Which cleaning service do you need scheduled?",
  };

  private getStored(workerId: string): ChatMessage[] {
    if (typeof window === "undefined") {
      return this.getDefaultThread(workerId);
    }
    try {
      const stored = sessionStorage.getItem(CHAT_STORAGE_PREFIX + workerId);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    const defaults = this.getDefaultThread(workerId);
    this.saveStored(workerId, defaults);
    return defaults;
  }

  private saveStored(workerId: string, messages: ChatMessage[]) {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(CHAT_STORAGE_PREFIX + workerId, JSON.stringify(messages));
      } catch {
        // ignore
      }
    }
  }

  private getDefaultThread(workerId: string): ChatMessage[] {
    const welcome =
      this.initialWelcomes[workerId] ||
      "Namaste! Thank you for reaching out through SevaSaathi. How can I assist you with your home service today?";

    return [
      {
        id: `msg-${Date.now()}-0`,
        workerId,
        sender: "worker",
        text: welcome,
        timestamp: "Just now",
      },
    ];
  }

  async getMessages(workerId: string): Promise<ChatMessage[]> {
    return this.getStored(workerId);
  }

  async sendMessage(workerId: string, text: string): Promise<ChatMessage> {
    const list = this.getStored(workerId);
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      workerId,
      sender: "customer",
      text,
      timestamp: "Just now",
    };
    const updated = [...list, newMsg];
    this.saveStored(workerId, updated);
    return newMsg;
  }

  async receiveWorkerReply(workerId: string, text: string): Promise<ChatMessage> {
    const list = this.getStored(workerId);
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      workerId,
      sender: "worker",
      text,
      timestamp: "Just now",
    };
    const updated = [...list, newMsg];
    this.saveStored(workerId, updated);
    return newMsg;
  }
}

export const chatRepository = new MockChatRepository();
