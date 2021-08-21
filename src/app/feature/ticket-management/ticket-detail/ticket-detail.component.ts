import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, merge, Observable, zip } from 'rxjs';
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

  constructor(private _backendService: BackendService, private _route: ActivatedRoute, private _router: Router) {
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

  public async complete(ticket: Ticket) {
    await this._backendService.complete(ticket.id, true).toPromise();
    this._router.navigate(['../', { relativeTo: this._route }])
  }

  public async assignTicket(ticket: Ticket) {
    await this._backendService.assign(ticket.id, ticket.assigneeId).toPromise();
  }
}
