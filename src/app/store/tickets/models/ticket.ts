export interface Ticket {
  id: number;
  name: string;
  description: string;
  assigneeId: number;
  completed: boolean;
}
