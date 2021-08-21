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
import { BackendService, Ticket, User } from '../services/backend.service';
import { RouterTestingModule} from '@angular/router/testing';
import { TicketDetailComponent } from './ticket-detail.component';

const mockTicket: Ticket = {
  id: 123,
  name: 'test ticket',
  description: 'test description',
  assigneeId: 123, 
  completed: false
}

const mockUsers: User[] = [
  { id: 111, name: "Victor" },
  { id: 222, name: "Jack" }
];

const routeId = 123;

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
        useValue: jasmine.createSpyObj('BackendService', ['ticket', 'newTicket', 'users', 'complete'])
     }, {
      provide: ActivatedRoute,
      useValue: {
        snapshot: {
          paramMap: {
            get: () => routeId, // represents the ticket id
          },
        },
      },
    }]
    })
    .compileComponents();

    mockBackendService = TestBed.inject(BackendService) as jasmine.SpyObj<BackendService>;
  });

  beforeEach(() => {
    mockBackendService.ticket.and.returnValue(of(mockTicket));
    mockBackendService.users.and.returnValue(of(mockUsers));
    fixture = TestBed.createComponent(TicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load and display the ticket', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(mockBackendService.ticket).toHaveBeenCalledWith(routeId);
    expect(compiled.querySelector('#ticket-name').textContent).toContain(mockTicket.name);
    expect(compiled.querySelector('#ticket-description').textContent).toContain(mockTicket.description);
  });

  it('clicking complete ticket should call backend to complete', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let completeButton = fixture.debugElement.nativeElement.querySelector('#complete-button');
    completeButton.click();
  
    fixture.whenStable().then(() => {
      expect(mockBackendService.complete).toHaveBeenCalledWith(mockTicket.id, true);
    });
  });
});
