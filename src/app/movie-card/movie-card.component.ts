import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');
  movies: any[] = [];
  currentUser: any = null;
  currentFavs: any = null;

  constructor(
    public fetchApiData: UserRegistrationService, 
    public dialog: MatDialog, 
    public snackBar: MatSnackBar,
    public router: Router
    ) { }


  ngOnInit(): void {
    this.getMovies();
    this.getCurrentUser();
  }

  // Gets all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      //console.log(this.movies);
      return this.movies;
    });
  }

  // Opens the director view
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px',
      panelClass: 'director-custom'
    });
    console.log(name)
  }

  // Opens the Genre view
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
      panelClass: 'genre-custom'
    });
  }

  // Opens the synopsis view
  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px',
      panelClass: 'synopsis-custom'
    });
  }

  // Gets the current user
  getCurrentUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUserProfile().subscribe((res: any) => {
      console.log(res)
      const currentUser = res.Username
      console.log(currentUser)
      const currentFavs = res.FavoriteMovies
      console.log(currentFavs)
    });
  }

  // Adds movie to users favorites
  addToUserFavs(id: string, Title: string): void {
    console.log(id);
    const token = localStorage.getItem('token');
    console.log(token)
    this.fetchApiData.addFavoriteMovies(id).subscribe((res: any) => {
      this.snackBar.open(`Successfully added ${Title} to favorite movies.`, 'OK', {
        duration: 4000,
        verticalPosition: 'top'
      });
      console.log(res)
      this.ngOnInit();
    });
  }

  // Deletes a movie from users favorite movies
  deleteFavoriteMovies(id: string, Title: string): void {
    console.log(id)
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been removed from favorites`, 'OK', {
        duration: 2000,
        verticalPosition: 'top'
      });
      this.ngOnInit();
      console.log(res)
    });
    return this.getCurrentUser();
  }
}
