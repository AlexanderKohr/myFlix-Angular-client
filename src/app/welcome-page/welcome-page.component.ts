import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void { }

  /* This is the function that will open the 
  dialog when the signup button is clicked */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '480px',
      panelClass: 'register-custom'
    });
  }

  /* This function will open the dialog 
  when the login button is clicked */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assiging the dialog a width
      width: '480px',
      panelClass: 'login-custom'
    });
  }
}
