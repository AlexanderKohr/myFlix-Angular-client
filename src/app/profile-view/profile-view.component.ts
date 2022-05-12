import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationService } from  '../fetch-api-data.service';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { UserEditComponent } from '../user-edit/user-edit.component';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  username: any = localStorage.getItem('user');
  favoriteMovies: any[] = [];
  displayElement: boolean = false

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getFavoriteMovies();
  }

  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px'
    });
  }

  public openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px'
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
    console.log('Name: ' + name)
  }


  getUserProfile(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUserProfile().subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        return this.user;
      });
    }
  }

  openEditUserProfile(): void {
    this.dialog.open(UserEditComponent, {
      width: '500px'
    });
  }

  // Gets favorite movies
  /* getFavs(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.include(movie._id)) {
          this.favMovies.push(movie);
          this.displayElement = true;
        }
      });
    });
    console.log(this.favMovies);
  } */

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((res: any) => {
      this.favoriteMovies = res.FavoriteMovies;
      return this.favoriteMovies;
    });
  }

  // Deletes a users account
  deleteUserProfile(): void {
    if (confirm('Are your sure you want to delete your account? This can\'t be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account has been deleted', 'OK', {duration: 6000});
      });
      this.router.navigate(['welcome'])
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        localStorage.clear();
      });
    }
  }

  deleteFavoriteMovies(MovieID: string, Title: string): void {
    this.fetchApiData.deleteFavoriteMovies(MovieID).subscribe((res: any) => {
      this.snackBar.open(`Successfully removed ${Title} from favorite movies.`, 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      return this.favoriteMovies;
    })
  }
}
