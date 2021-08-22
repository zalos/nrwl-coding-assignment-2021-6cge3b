import { Ticket } from "./models/ticket";
import { User } from "./models/user";

export interface TicketFeatureState {
  readonly loading: boolean;
  readonly tickets: Ticket[];
  readonly users: User[];
  readonly error: string;
}

export const defaultTicketFeatureState: TicketFeatureState = {
  loading: true,
  tickets: [],
  users: [],
  error: null,
};

const defaultTicketState: Ticket = {
  assigneeId: null,
  name: "",
  description: "",
  completed: false,
  id: -1,
};
