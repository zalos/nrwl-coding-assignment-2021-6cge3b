import { Injectable } from "@angular/core";
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

export type User = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  name: string;
  description: string;
  assigneeId: number;
  completed: boolean;
};

function randomDelay() {
  return Math.random() * 1000;
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

  private findTicketById = id =>
    this.storedTickets.find(ticket => ticket.id === +id);

  private findUserById = id => this.storedUsers.find(user => user.id === +id);

  tickets(): Observable<Ticket[]> {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  ticket(id: number): Observable<Ticket> {
    return of(this.findTicketById(id)).pipe(delay(randomDelay()));
  }

  users(): Observable<User[]> {
    return of(this.storedUsers).pipe(delay(randomDelay()));
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

    return of(newTicket).pipe(delay(randomDelay()));
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

    return of(updatedTicket).pipe(delay(randomDelay()));
  }
}
