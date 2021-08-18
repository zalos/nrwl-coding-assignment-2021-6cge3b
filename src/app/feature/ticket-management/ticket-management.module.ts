import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketManagementRoutingModule } from './ticket-management-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { BackendService } from './services/backend.service';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [TicketListComponent, TicketDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    TicketManagementRoutingModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [BackendService]
})
export class TicketManagementModule { }
