import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the cleint app
const apiUrl = 'https://movieanorak.herokuapp.com/';
// Get token from localStorage
const token = localStorage.getItem('token');
// Get username from localStorage for endpoints
const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  /**
   * calls API end-point to register a new user
   * @param userDetails {any}
   * @returns a new user object in json format
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * calls API endpoin to log a user in
   * @param userDetails {any}
   * @returns user's data in json format
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'login', userDetails)
    .pipe(catchError(this.handleError)
    );
  }

  /**
   * calls API end-point to get all movies
   * @returns array of all movies in json format
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API end-point to get a single movie
   * @returns a single movie in json format
   */
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/:Title', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API end-point to get data about a specific director by name
   * @returns a director's data in json format
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API end-point to get data about a specific genre by name
   * @returns a genre's data in json format
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/genre/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API end-point to get a user's favorite movies
   * @returns a an array of user's favorite movies in json format
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API end-point to add a specific movie to the user's favorites
   * @param MovieID {string}
   * @returns the updated user's list of favorite movies
   */
  public addFavoriteMovies(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    console.log('MovieID:' + MovieID)
    // console.log(apiUrl + `users/${username}/movies/${MovieID}`);
    return this.http
    .post(apiUrl + `users/${username}/movies/${MovieID}`, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API end-point to remove a movie from user's favorites
   * @param MovieID {string}
   * @returns the updated user's list of favorite movies
   */
  public deleteFavoriteMovies(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    console.log('ID: ' + MovieID);
    return this.http
    .delete(apiUrl + `users/${username}/movies/${MovieID}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API end-point to get a logged in user's data
   * @returns user's data
   */
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError));
  }

  /**
   * calls API end-point to edit a user's data
   * @param userData {object}
   * @returns user's updated data ind json format
   */
  editUserProfile(userData:object): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .put(apiUrl + `users/${username}`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API end-point to delete a current user from database
   * @returns delete status
   */
  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
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
