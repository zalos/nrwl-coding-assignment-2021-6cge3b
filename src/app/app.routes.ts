import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'tickets',
    loadChildren: () => import('./feature/ticket-management/ticket-management.module').then((m) => m.TicketManagementModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./feature/about/about.module').then((m) => m.AboutModule)
  },
  {
    path: '**', redirectTo: 'tickets'
  }
]
