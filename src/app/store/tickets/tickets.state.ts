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
  tickets: [
    {
      id: 0,
      name: "Install a monitor arm",
      description:
        "I currently have my monitors on top of books. True story, but hey, its been working.",
      assigneeId: 111,
      completed: false,
    },
    {
      id: 1,
      name: "Move the desk to the new location",
      description:
        "Please move the desk down the hall from room 101 to room 999.... good luck!",
      assigneeId: 111,
      completed: false,
    },
  ],
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
