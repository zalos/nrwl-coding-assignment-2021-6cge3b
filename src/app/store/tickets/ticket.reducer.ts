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
  }),
  on(TicketAction.SetSelectedTicketStatusFilter, (state, action) => {
    return {
      ...state,
      selectedTicketStatus: action.ticketStatus,
    };
  }),
  on(TicketAction.SetSelectedUserFilter, (state, action) => {
    return {
      ...state,
      selectedUser: action.assigneeId,
    };
  })
);