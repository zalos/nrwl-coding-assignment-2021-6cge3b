import { TicketStatus } from "src/app/feature/ticket-management/services/backend.service";
import { Ticket } from "./models/ticket";
import { User } from "./models/user";

export interface TicketFeatureState {
  readonly loading: boolean;
  readonly tickets: Ticket[];
  readonly selectedUser: number;
  readonly selectedTicketStatus: TicketStatus;
  readonly users: User[];
  readonly error: string;
}

export const defaultTicketFeatureState: TicketFeatureState = {
  loading: true,
  tickets: [],
  users: [],
  error: null,
  selectedTicketStatus: TicketStatus.Open,
  selectedUser: -1
};

const defaultTicketState: Ticket = {
  assigneeId: null,
  name: "",
  description: "",
  completed: false,
  id: -1,
};
