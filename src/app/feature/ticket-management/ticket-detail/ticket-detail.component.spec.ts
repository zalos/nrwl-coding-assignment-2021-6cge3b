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
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BackendService } from '../services/backend.service';
import { RouterTestingModule} from '@angular/router/testing';
import { TicketDetailComponent } from './ticket-detail.component';

describe('TicketDetailComponent', () => {
  let component: TicketDetailComponent;
  let fixture: ComponentFixture<TicketDetailComponent>;
  let mockBackendService: jasmine.SpyObj<BackendService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketDetailComponent ],
      imports: [
        RouterTestingModule,
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
        useValue: jasmine.createSpyObj('BackendService', ['ticket', 'newTicket', 'users'])
     }, {
      provide: ActivatedRoute,
      useValue: {
        snapshot: {
          paramMap: {
            get: () => 123, // represents the ticket id
          },
        },
      },
    }]
    })
    .compileComponents();

    mockBackendService = TestBed.inject(BackendService) as jasmine.SpyObj<BackendService>;
  });

  beforeEach(() => {
    mockBackendService.ticket.and.returnValue(of({
      id: 123,
      name: 'test ticket',
      description: 'test description'
    }));
    mockBackendService.users.and.returnValue(of([]));
    fixture = TestBed.createComponent(TicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
