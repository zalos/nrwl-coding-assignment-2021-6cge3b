import { createAction, props } from "@ngrx/store";
import { Ticket } from "./models/ticket";

export const LoadTickets = createAction('[Ticket] Load...');
export const LoadTicketsFailure = createAction("[TICKET] Load Error", props<{error: string}>());
export const LoadTicketsSuccess = createAction("[TICKET] Load Success", props<{tickets: Ticket[]}>());
export const AddTicket = createAction("[TICKET] Add", props<{ticket: Ticket}>());
export const AssignTicket = createAction("[TICKET] Assign", props<{ticketId: number, assigneeId: number}>());
export const CompleteTicket = createAction("[TICKET] Complete", props<{ticketId: number, complete: boolean}>());