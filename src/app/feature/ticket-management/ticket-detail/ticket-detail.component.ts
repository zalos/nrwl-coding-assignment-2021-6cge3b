import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, merge, Observable, zip } from 'rxjs';
import { BackendService, Ticket, User } from '../services/backend.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent {
  public customerIdFromRoute: number;
  public ticket: Ticket;
  public users: User[];
  public errorMessage: string;
  
  constructor(private _backendService: BackendService, private _route: ActivatedRoute) {
    this.getIdFromRoute();

    var ticket$ = this._backendService.ticket(this.customerIdFromRoute);
    var user$ = this._backendService.users();
    combineLatest([ticket$, user$]).subscribe((value) => {
      this.ticket = value[0];
      this.users = value[1];
    });
  }

  public getIdFromRoute() {
    this.customerIdFromRoute = parseInt(this._route.snapshot.paramMap.get('id'));
    if(isNaN(this.customerIdFromRoute)) {
      this.errorMessage = 'Invalid Ticket ID';
    }
  }

  public async complete() {
    await this._backendService.complete(this.ticket.id, true).toPromise();
    console.log('completed');
  }
}
