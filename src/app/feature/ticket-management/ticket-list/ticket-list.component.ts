import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { BackendService, Ticket, TicketStatus, User } from '../services/backend.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTicketDialogComponent } from "./add-ticket/add-ticket.component";
import { select, Store } from '@ngrx/store';
import * as TicketActions from '../../../store/tickets';
import { LoadTickets, LoadTicketsSuccess } from '../../../store/tickets';
import { TicketFeatureState } from 'src/app/store/tickets/tickets.state';
import { GetAllTickets } from 'src/app/store/tickets/ticket.selectors';

class TicketItem extends Ticket {
  userName: string;
}

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  public TicketStatus = TicketStatus;
  public tickets = this.backend.tickets();
  public userMap: Map<number, User> = new Map<number, User>();
  public users = this.backend.users().pipe(tap(users => {
    this.userMap = Object.assign({}, ...users.map((user) => ({[user.id]: user})));
  }));
  public selectedUser: number = -1; // -1 is the designation for not applying the filter
  public selectedStatus: TicketStatus = TicketStatus.Open;
  public tickets$ = this._store.pipe(select(GetAllTickets));


  constructor(private _store: Store<TicketFeatureState>, private backend: BackendService, private _dialog: MatDialog) {
    //this.filterTickets();
    this._store.dispatch(LoadTickets());
  }

  /**
   * Filter the tickets based on the user and status selected 
   */
  filterTickets() {
    this.tickets = this.backend.tickets();
    if(this.selectedUser > -1) {
      this.tickets = this.tickets.pipe(map(tickets => tickets.filter(ticket => ticket.assigneeId === this.selectedUser)));
    }
    if(this.selectedStatus !== TicketStatus.Any) {
      this.tickets = this.tickets.pipe(map(tickets => tickets.filter(ticket => ticket.completed === (this.selectedStatus == TicketStatus.Closed))));
    }
  }

  /**
   * Opens the add ticket Dialog
   */
  openAddTicketDialog() {
    const dialogRef = this._dialog.open(AddTicketDialogComponent, {data: {}});

    dialogRef.afterClosed().subscribe(async newTicket => {
      await this.backend.newTicket(newTicket).toPromise();
      if(this.selectedStatus == TicketStatus.Closed) {
        this.selectedStatus = TicketStatus.Open;
      }
      this.filterTickets();
    });
  }

  ngOnInit(): void {
  }

}

