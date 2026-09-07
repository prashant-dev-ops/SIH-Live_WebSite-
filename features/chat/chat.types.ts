export interface ChatMessage {
  id: string;
  workerId: string;
  sender: "customer" | "worker";
  text: string;
  timestamp: string;
}

export interface ChatThread {
  workerId: string;
  workerName: string;
  messages: ChatMessage[];
}
