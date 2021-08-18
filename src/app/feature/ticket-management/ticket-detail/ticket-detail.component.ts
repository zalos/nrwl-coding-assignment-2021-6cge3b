import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService, Ticket } from '../services/backend.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  public customerIdFromRoute: number;
  public ticket: Ticket;
  
  constructor(private _backendService: BackendService, private _route: ActivatedRoute) {
    this.customerIdFromRoute = parseInt(_route.snapshot.paramMap.get('id'));
    this.loadTicket();
  }

  public async loadTicket() {
    this.ticket = await this._backendService.ticket(this.customerIdFromRoute).toPromise();
  }

  ngOnInit(): void {
  }

}
