import { Component, OnInit } from '@angular/core';
import {Movie} from '../../models/movie';
import { MovieService } from '../movie.service';
// import {fakeMovies} from '../../models/fake-movies';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
/* selectedMovie!: Movie;
onSelect(movie:Movie):void{
  this.selectedMovie=movie;
  console.log(`selectedMovie=${JSON.stringify(this.selectedMovie)}`);
  console.log(this.selectedMovie);
} */
  movies: Movie[]=[];
  constructor(private movieService: MovieService) { }
  getMoviesFromServices():void{
  //this.movies = this.movieService.getMovies();
   this.movieService.getMovies().subscribe(
      (updatedMovies)=>{this.movies=updatedMovies;}
    );
  }
  ngOnInit(): void {
    this.getMoviesFromServices();
  }
  //add new movie
  addMovie(name:string,releaseYear:string):void{
    name=name.trim();
    if(Number.isNaN(Number(releaseYear))||!name || Number(releaseYear)===0){
      alert('name must not be blank, Release Year must be a number');
      return;
    }
    const newMovie:Movie= new Movie();
    newMovie.name=name;
    newMovie.releaseYear=Number(releaseYear);
    this.movieService.addMovie(newMovie).subscribe(insertedMovie=>this.movies.push(insertedMovie));
  }
  deleteMovie(movieId:number):void{
    this.movieService.deleteMovie(movieId).subscribe(()=>{
    this.movies=this.movies.filter(eachMovie=>eachMovie.id !==movieId);
    });
  }
}
