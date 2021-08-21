import { Ticket } from "./models/ticket";
import { User } from "./models/user";
import * as TicketAction from "./ticket.actions";

export interface TicketFeatureState {
    readonly loading: boolean;
    readonly tickets: Ticket[];
    readonly users: User[];
}

const defaultTicketFeatureState: TicketFeatureState = {
    loading: true,
    tickets: [],
    users: []
}

const defaultTicketState: Ticket = {
    assigneeId: null,
    name: '',
    description: '',
    completed: false,
    id: -1
}


export function TicketReducer(state: TicketFeatureState = defaultTicketFeatureState, action: TicketAction.TicketAction) {
    switch(action.type) {
        case TicketAction.LOAD:
            state = {
                ...state,
                loading: true
              };
        break;
        case TicketAction.LOAD_SUCCESS:
            state = {
                ...state,
                loading: false,
                tickets: action.payload
              };
        break;
        case TicketAction.LOAD_ERROR:
            state = {
                ...state,
                loading: false
              };
        break;
        case TicketAction.ADD:
            break;
    }
}