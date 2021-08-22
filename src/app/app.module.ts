import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './feature/header/header.module';
import { StoreModule } from '@ngrx/store';
import { TicketReducer } from './store/tickets/ticket.reducer';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    BrowserAnimationsModule,
    HeaderModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
