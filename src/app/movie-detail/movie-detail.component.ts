import { Component, OnInit,Input } from '@angular/core';
import { Movie } from 'src/models/movie';
//router
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie!:Movie;
  constructor(
    private route:ActivatedRoute,
    private movieService:MovieService,
    private location:Location
  ) { }
  ngOnInit(): void {
    this.getMovieFromRoute();
  }
getMovieFromRoute():void{
const id = +this.route.snapshot.paramMap.get('id')!;
//console.log(`this.route.snapshot.paramMap=${JSON.stringify(this.route.snapshot.paramMap)}`)
//cal Service to "get movie from id"
this.movieService.getMovieFromId(id).subscribe(Movie=>this.movie=Movie);
}
goBack():void{
  this.location.back();
}
save(){
  this.movieService.updateMovie(this.movie).subscribe(()=>this.goBack());
}
}
