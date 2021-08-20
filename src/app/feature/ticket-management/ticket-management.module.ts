import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TicketManagementRoutingModule } from "./ticket-management-routing.module";
import { TicketListComponent } from "./ticket-list/ticket-list.component";
import { AddTicketDialogComponent } from "./ticket-list/add-ticket/add-ticket.component";
import { TicketDetailComponent } from "./ticket-detail/ticket-detail.component";
import { BackendService } from "./services/backend.service";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    TicketListComponent,
    TicketDetailComponent,
    AddTicketDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TicketManagementRoutingModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
  ],
  entryComponents: [AddTicketDialogComponent],
  providers: [BackendService],
})
export class TicketManagementModule {}
