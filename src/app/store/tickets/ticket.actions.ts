import { Action } from "@ngrx/store";
import { Ticket } from "./models/ticket";

export const LOAD = "[TICKET] Load...";
export const LOAD_SUCCESS = "[TICKET] Load Success";
export const LOAD_ERROR = "[TICKET] Load Error";
export const ADD = "[TICKET] Add";
export const ASSIGN = "[TICKET] Assign";
export const COMPLETE = "[TICKET] Complete";

export class LoadTickets implements Action {
  readonly type: string = LOAD;
  constructor(public payload: number) {}
}

export class LoadTicketsSuccess implements Action {
  readonly type: string = LOAD_SUCCESS;
  constructor(public payload: Ticket[]) {}
}

export class LoadTicketsFailure implements Action {
  readonly type: string = LOAD_ERROR;
}

export class AddTicket implements Action {
  readonly type: string = ADD;
  constructor(public payload: Ticket) {}
}

export class AssignTicket implements Action {
  readonly type: string = ASSIGN;
  constructor(public payload: number) {}
}

export class CompleteTicket implements Action {
  readonly type: string = COMPLETE;
}

export type TicketAction = AssignTicket | CompleteTicket | AddTicket;
