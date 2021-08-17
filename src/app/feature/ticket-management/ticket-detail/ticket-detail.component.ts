import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  tickets = this.backend.tickets();
  users = this.backend.users();

  constructor(private backend: BackendService) {}

  ngOnInit(): void {
  }

}
