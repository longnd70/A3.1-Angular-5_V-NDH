import { Injectable, Type } from '@angular/core';
// import { fakeMovies } from '../models/fake-movies';
import { Movie } from '../models/movie';
//Get data asynchronously with Observable
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient, public messageService: MessageService) { }
  private moviesURL = 'http://localhost:3000/movies';
  getMovies(): Observable<Movie[]> {
    // this.messageService.add(`${ new Date().toLocaleString()}. Get movie list`);
    // return of(fakeMovies);
    return this.http.get<Movie[]>(this.moviesURL).pipe(
      tap(receivedMovies => console.log('receivedMovies=${JSON.stringify(receivedMovies)}')),
      catchError(error => of([]))
    );
  }
  getMovieFromId(id: number): Observable<Movie> {
    // return of(fakeMovies.find(movie => movie.id === id));
    const url = `${this.moviesURL}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(selectedMovie => console.log('selectedMovie=${JSON.stringify(selectedMovie)}')),
      catchError(error => of(new Movie()))
    );
  }
  // PUT: update the movie on the Server
  updateMovie(movie: Movie): Observable<any>{    
    return this.http.put(`${this.moviesURL}/${movie.id}`,movie,httpOptions).pipe(
      tap(updatedMovie => console.log('updatedMovie=${JSON.stringify(updatedMovie)}')),
      catchError(error => of(new Movie()))
    );
  } 
  // POST: add a new movie to the Server
  addMovie(newMovie: Movie): Observable<Movie>{    
    return this.http.post(this.moviesURL,newMovie,httpOptions).pipe(
      tap((movie:Movie) => console.log('Inserted Movie=${JSON.stringify(movie)}')),
      catchError(error => of(new Movie()))
    );
  } 
  // DELETE: Delete the movie on the Server
  deleteMovie(movieId: Number): Observable<Movie>{    
    const url = `${this.moviesURL}/${movieId}`;
    return this.http.delete<Movie>(url,httpOptions).pipe(
      tap(()=> console.log('Deleted Movie with id = ${movieId}')),
      catchError(error => of(null))
    );
  }
  searchMovie(typedString:string): Observable<Movie[]> {
    if(!typedString.trim()){
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesURL}?name_like=${typedString}`).pipe(
      tap(foundedMovies => console.log('founded Movies=${JSON.stringify(foundedMovies)}')),
      catchError(error => of(null))
    );
  }
}