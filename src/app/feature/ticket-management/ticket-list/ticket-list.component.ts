import { Component, OnInit } from '@angular/core';
import { BackendService, TicketStatus } from '../services/backend.service';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  public TicketStatus = TicketStatus;
  public tickets = this.backend.tickets();
  public users = this.backend.users();
  public selectedUser: number = -1; // -1 is the designation for not applying the filter
  public selectedStatus: TicketStatus = TicketStatus.Open;

  constructor(private backend: BackendService) {}

  ngOnInit(): void {
  }

}
