import { createAction, props } from "@ngrx/store";
import { TicketStatus } from "src/app/feature/ticket-management/services/backend.service";
import { Ticket } from "./models/ticket";

export const LoadTickets = createAction('[Ticket] Load...');
export const LoadTicketsFailure = createAction("[TICKET] Load Error", props<{error: string}>());
export const LoadTicketsSuccess = createAction("[TICKET] Load Success", props<{tickets: Ticket[]}>());
export const AddTicket = createAction("[TICKET] Add", props<{name: string, description: string}>());
export const AddTicketSuccess = createAction("[TICKET] Add Success", props<{ticket: Ticket}>());
export const AddTicketFailure = createAction("[TICKET] Add Failure", props<{error: Error}>());
export const AssignTicket = createAction("[TICKET] Assign", props<{ticketId: number, assigneeId: number}>());
export const AssignTicketSuccess = createAction("[TICKET] Assign Success");
export const AssignTicketFailure = createAction("[TICKET] Assign Failure", props<{error: Error}>());
export const ChangeTicketStatus = createAction("[TICKET] Change Status", props<{ticketId: number, complete: boolean}>());
export const ChangeTicketStatusSuccess = createAction("[TICKET] Change Status");
export const ChangeTicketStatusFailure = createAction("[TICKET] Change Status", props<{error: Error}>());
export const SetSelectedUserFilter = createAction('[TICKET] Set Selected User Filter', props<{assigneeId: number}>());
export const SetSelectedTicketStatusFilter = createAction('[TICKET] Set Selected Ticket Status Filter', props<{ticketStatus: TicketStatus}>());