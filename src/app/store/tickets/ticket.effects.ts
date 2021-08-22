import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { BackendService } from 'src/app/feature/ticket-management/services/backend.service';
import { LoadTickets, LoadTicketsFailure, LoadTicketsSuccess } from './ticket.actions';
import { of } from 'rxjs';
 
@Injectable()
export class TicketEffects {
 
  loadMovies$ = createEffect(() => this._actions$.pipe(
    ofType(LoadTickets),
    mergeMap(() => this._backendService.tickets()
      .pipe(
        map(tickets => LoadTicketsSuccess({tickets: tickets})),
        catchError((err) => of(LoadTicketsFailure({error: err})))
      ))
    )
  );
 
  constructor(
    private _actions$: Actions,
    private _backendService: BackendService
  ) {}
}