import { createReducer, on } from "@ngrx/store";
import * as TicketAction from "./ticket.actions";
import { defaultTicketFeatureState, TicketFeatureState } from "./tickets.state";

export const TicketReducer = createReducer<TicketFeatureState>(
  defaultTicketFeatureState,
  on(TicketAction.LoadTickets, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }), 
  on(TicketAction.LoadTicketsSuccess, (state, action) => {
    return {
      ...state,
      tickets: [...action.tickets],
    };
  })
);