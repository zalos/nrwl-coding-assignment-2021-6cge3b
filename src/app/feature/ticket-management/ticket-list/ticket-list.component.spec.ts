import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { BackendService } from '../services/backend.service';
import { AddTicketDialogComponent } from './add-ticket/add-ticket.component';

import { TicketListComponent } from './ticket-list.component';

describe('TicketListComponent', () => {
  let component: TicketListComponent;
  let fixture: ComponentFixture<TicketListComponent>;
  let mockBackendService: jasmine.SpyObj<BackendService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketListComponent ],
      imports: [
        CommonModule,
        FormsModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [{
        provide: BackendService,
        useValue: jasmine.createSpyObj('BackendService', ['tickets', 'users'])
     }]
    })
    .compileComponents();

    mockBackendService = TestBed.inject(BackendService) as jasmine.SpyObj<BackendService>;
  });

  beforeEach(() => {
    mockBackendService.tickets.and.returnValue(of([]));
    mockBackendService.users.and.returnValue(of([]));
    fixture = TestBed.createComponent(TicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
