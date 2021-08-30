export interface Ticket {
  id: number;
  name: string;
  description: string;
  assigneeId: number;
  completed: boolean;
}

export enum TicketStatus {
  Any = -1,
  Open = 1,
  Closed = 2
}