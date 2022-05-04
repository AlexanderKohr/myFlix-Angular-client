import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the cleint app
const apiUrl = 'https://movieanorak.herokuapp.com';
// Get token from localStorage
const token = localStorage.getItem('token');
// Get username from localStorage for endpoints
const username = localStorage.getItem('username');

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError));
  }

  // get a singe movie's detail
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/:movieId', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError));
  }

  // get a singe movie's director detail
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError));
  }

  // get a singe movie's genre detail
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/genre/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError));
  }

  // get a users favorite movies
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError));
  }

  // add a movie to favorite movies list
  addFavoriteMovies(id:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .post(apiUrl + `users/${username}/movies/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError));
  }

  // delete movie from favorite movies list
  deleteFavoriteMovies(id:string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .delete(apiUrl + `users/${username}/movies/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError));
  }

  // get users profile information
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError));
  }

  // edit user's profile data
  editUserProfile(userData:object): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .put(apiUrl + `users/${username}`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError));
  }

  // delete a user's profile
  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError));
  }

  // function that handles errors
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
