import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userCredentials = { Username: '', Password: ''};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

  ngOnInit(): void {}

  /**
   * logs the user in
   * displays message telling the user to have successfully logged in
   * navigates to movies page
   * @function userLogin
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('user', response.user.Username);
        localStorage.setItem('token', response.token);
        this.dialogRef.close();
        this.snackBar.open('You are logged in', 'OK', {
          duration: 2000,
          verticalPosition: 'top'
        });
        this.router.navigate(['movies']);
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }

}
