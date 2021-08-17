import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

enum TicketStatus {
  Any = -1,
  Open = 1,
  Closed = 2
}
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  public TicketStatus = TicketStatus;
  public tickets = this.backend.tickets();
  public users = this.backend.users();
  public selectedUser: number = -1;
  public selectedStatus: TicketStatus = TicketStatus.Open;


  constructor(private backend: BackendService) {}

  ngOnInit(): void {
  }

}
