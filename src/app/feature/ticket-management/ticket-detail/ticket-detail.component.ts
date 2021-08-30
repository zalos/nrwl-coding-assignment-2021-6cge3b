import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, merge, Observable, zip } from 'rxjs';
import { AssignTicket, ChangeTicketStatus } from 'src/app/store/tickets';
import { TicketFeatureState } from 'src/app/store/tickets/tickets.state';
import { BackendService, Ticket, User } from '../services/backend.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent {
  public customerIdFromRoute: number;
  public errorMessage: string;
  public ticket$: Observable<Ticket>;
  public users$: Observable<User[]>;

  constructor(private _store: Store<TicketFeatureState>, private _backendService: BackendService, private _route: ActivatedRoute, private _router: Router) {
    this.getIdFromRoute();

    this.ticket$ = this._backendService.ticket(this.customerIdFromRoute);
    this.users$ = this._backendService.users();
  }

  public getIdFromRoute() {
    this.customerIdFromRoute = parseInt(this._route.snapshot.paramMap.get('id'));
    if(isNaN(this.customerIdFromRoute)) {
      this.errorMessage = 'Invalid Ticket ID';
    }
  }

  public async changeStatus(ticket: Ticket) {
    this._store.dispatch(ChangeTicketStatus({ticketId: ticket.id, complete: ticket.completed}));
  }

  public async assignTicket(ticket: Ticket) {
    this._store.dispatch(AssignTicket({ticketId: ticket.id, assigneeId: ticket.assigneeId}))
  }
}
