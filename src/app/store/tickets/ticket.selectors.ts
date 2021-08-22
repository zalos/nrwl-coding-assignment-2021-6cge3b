import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TicketFeatureState } from "./tickets.state";

export const TicketFeatureSelector = createFeatureSelector<TicketFeatureState>('tickets');
export const GetAllTickets = createSelector(TicketFeatureSelector, s => s.tickets);