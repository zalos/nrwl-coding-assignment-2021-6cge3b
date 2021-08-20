import { JsonpClientBackend } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tick } from "@angular/core/testing";
import { Observable, of, throwError } from "rxjs";
import { delay, tap } from "rxjs/operators";

/**
 * This service acts as a mock backend.
 *
 * You are free to modify it as you see.
 */

 export enum TicketStatus {
  Any = -1,
  Open = 1,
  Closed = 2
}

export class User {
  id: number;
  name: string;
};

export class Ticket {
  id: number;
  name: string;
  description: string;
  assigneeId: number;
  completed: boolean;
};

function randomDelay() {
  return Math.random() * 1000;
}

function saveToStorage(key: string, value: any) {
  window.localStorage.setItem(key, value);
  console.log(`saved ${key} to storage`);
}

function loadFromStorage(key: string) {
  var value = window.localStorage.getItem(key);
  if(value) {
    console.log(`loaded ${key} from storage`);
    return JSON.parse(value);
  }
  return null;
}

@Injectable()
export class BackendService {
  storedTickets: Ticket[] = [
    {
      id: 0,
      name: "Install a monitor arm",
      description: "I currently have my monitors on top of books. True story, but hey, its been working.",
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      name: "Move the desk to the new location",
      description: "Please move the desk down the hall from room 101 to room 999.... good luck!",
      assigneeId: 111,
      completed: false
    }
  ];

  storedUsers: User[] = [
    { id: 111, name: "Victor" },
    { id: 222, name: "Jack" }
  ];

  lastId = 1;

  constructor() {
    
  }

  private loadTicketsFromStorage(): Ticket[] {
    var tickets = loadFromStorage('tickets');
    if(tickets) {
      this.storedTickets = tickets; //overwrite with storage
    } else {
      saveToStorage('tickets', JSON.stringify(this.storedTickets));
    }
    return this.storedTickets;
  }

  private saveTicketsToStorage() {
    saveToStorage('tickets', JSON.stringify(this.storedTickets));
  }

  private loadUsersFromStorage(): User[] {
    var users = loadFromStorage('users');
    if(users) {
      this.storedUsers = users; //overwrite with storage
    } else {
      saveToStorage('users', JSON.stringify(this.storedUsers));
    }
    return this.storedUsers;
  }

  private findTicketById = id =>
    this.loadTicketsFromStorage().find(ticket => ticket.id === +id);

  private findUserById = id => this.loadUsersFromStorage().find(user => user.id === +id);

  tickets(): Observable<Ticket[]> {
    return of(this.loadTicketsFromStorage()).pipe(delay(randomDelay()));
  }

  ticket(id: number): Observable<Ticket> {
    return of(this.findTicketById(id)).pipe(delay(randomDelay()));
  }

  users(): Observable<User[]> {
    return of(this.loadUsersFromStorage()).pipe(delay(randomDelay()));
  }

  user(id: number): Observable<User> {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTicket(payload: { name: string, description: string }) {
    const newTicket: Ticket = {
      id: ++this.lastId,
      name: payload.name,
      description: payload.description,
      assigneeId: null,
      completed: false
    };

    this.storedTickets = this.storedTickets.concat(newTicket);
    return of(newTicket).pipe(delay(randomDelay()), tap((val) => {
      this.saveTicketsToStorage();
    }));
  }

  assign(ticketId: number, userId: number) {
    return this.update(ticketId, { assigneeId: userId });
  }

  complete(ticketId: number, completed: boolean) {
    return this.update(ticketId, { completed });
  }

  update(ticketId: number, updates: Partial<Omit<Ticket, "id">>) {
    const foundTicket = this.findTicketById(ticketId);

    if (!foundTicket) {
      return throwError(new Error("ticket not found"));
    }

    const updatedTicket = { ...foundTicket, ...updates };

    this.storedTickets = this.storedTickets.map(t =>
      t.id === ticketId ? updatedTicket : t
    );

    return of(updatedTicket).pipe(delay(randomDelay())).pipe(tap(() => {
      this.saveTicketsToStorage();
    }));
  }
}
