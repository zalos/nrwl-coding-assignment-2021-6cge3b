import { tick } from "@angular/core/testing";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TicketStatus } from "src/app/feature/ticket-management/services/backend.service";
import { TicketFeatureState } from "./tickets.state";

export const selectTicketFeature = createFeatureSelector<TicketFeatureState>('tickets');
export const GetAllTickets = createSelector(selectTicketFeature, s => s.tickets);
export const selectTicketFeatureFilteredTickets = createSelector(
    selectTicketFeature,
    (state: TicketFeatureState) => {
        return state.tickets.filter(ticket => {
            console.log(ticket);
            console.log(`${state.selectedUser} - ${state.selectedTicketStatus}`);
            const stateMatch = (state.selectedUser == -1 || (state.selectedUser == ticket.assigneeId)); 
            const statusMatch = (state.selectedTicketStatus == TicketStatus.Any || state.selectedTicketStatus == TicketStatus.Closed && ticket.completed || state.selectedTicketStatus == TicketStatus.Open && !ticket.completed );
            console.log(`${stateMatch} - ${statusMatch}`);
            return stateMatch && statusMatch;
        }            
        )
    }
);