import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { BackendService } from 'src/app/feature/ticket-management/services/backend.service';
import * as TicketActions from './ticket.actions';
import { of } from 'rxjs';
 
@Injectable()
export class TicketEffects {
 
  loadTickets$ = createEffect(() => this._actions$.pipe(
    ofType(TicketActions.LoadTickets),
    mergeMap(() => this._backendService.tickets()
      .pipe(
        map(tickets => TicketActions.LoadTicketsSuccess({tickets: tickets})),
        catchError((err) => of(TicketActions.LoadTicketsFailure({error: err})))
      ))
    )
  );

  addTicket$ = createEffect(() => this._actions$.pipe(
    ofType(TicketActions.AddTicket),
    mergeMap((payload) => this._backendService.newTicket({name: payload.name, description: payload.description })
      .pipe(
        map(newTicket => TicketActions.AddTicketSuccess({ticket: newTicket })),
        catchError((err) => of(TicketActions.LoadTicketsFailure({error: err})))
      ))
    )
  );

  addTicketSuccessReloadList$ = createEffect(() => {
    return this._actions$.pipe(
        ofType(TicketActions.AddTicketSuccess),
        /** An EMPTY observable only emits completion. Replace with your own observable stream */
        map(() => TicketActions.LoadTickets()));
  });

  changeStatusSuccessReloadList$ = createEffect(() => {
    return this._actions$.pipe(
        ofType(TicketActions.ChangeTicketStatusSuccess),
        /** An EMPTY observable only emits completion. Replace with your own observable stream */
        map(() => TicketActions.LoadTickets()));
  });

  changeAssigneeSuccessReloadList$ = createEffect(() => {
    return this._actions$.pipe(
        ofType(TicketActions.AssignTicketSuccess),
        /** An EMPTY observable only emits completion. Replace with your own observable stream */
        map(() => TicketActions.LoadTickets()));
  });

  assignTicket$ = createEffect(() => {
    return this._actions$.pipe(
        ofType(TicketActions.AssignTicket),
        mergeMap((payload) =>
          this._backendService.assign(payload.ticketId, payload.assigneeId).pipe(
            map(data => TicketActions.AssignTicketSuccess()),
            catchError(error => of(TicketActions.AssignTicketFailure({ error }))))
          ),
    );
  });

  changeStatus$ = createEffect(() => {
    return this._actions$.pipe(
        ofType(TicketActions.ChangeTicketStatus),
        mergeMap((payload) =>
          this._backendService.complete(payload.ticketId, payload.complete).pipe(
            map(data => TicketActions.ChangeTicketStatusSuccess()),
            catchError(error => of(TicketActions.ChangeTicketStatusFailure({ error }))))
          ),
    );
  });
 
  constructor(
    private _actions$: Actions,
    private _backendService: BackendService
  ) {}
}