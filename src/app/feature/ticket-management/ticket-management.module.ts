import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketManagementRoutingModule } from './ticket-management-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';


@NgModule({
  declarations: [TicketListComponent, TicketDetailComponent],
  imports: [
    CommonModule,
    TicketManagementRoutingModule
  ]
})
export class TicketManagementModule { }
