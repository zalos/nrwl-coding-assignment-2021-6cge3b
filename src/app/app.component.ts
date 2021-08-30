import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActionsSubject } from '@ngrx/store';
import { filter, skip } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _actions: ActionsSubject, private _snackBar: MatSnackBar) {
    // this._actions.pipe(
    //   filter( action =>  action.type.indexOf('Success') != -1 || action.type.indexOf('Failure') != -1 ) // optional: skips initial logging done by ngrx
    // ).subscribe((action) => this.runSnackBar(action));
  }

  private runSnackBar(action: any) {
      this._snackBar.open("message", action);
  }
}
