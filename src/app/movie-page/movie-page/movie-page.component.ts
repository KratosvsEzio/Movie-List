import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../service/movies.service';
import { StoreFavoriteMovieService } from 'src/app/service/store-favorite-movie.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {
  movie: any;
  imdbID: string;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private storeFavoriteMovieService: StoreFavoriteMovieService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.imdbID = this.route.snapshot.paramMap.get('imdbID');
    this.moviesService.getSingleMoive(this.imdbID).subscribe( (movie) => {
      this.movie = movie;
    });
  }

  backClicked() {
    this.location.back();
  }

  favorite(movie: any) {
    this.storeFavoriteMovieService.storeFavoriteMovie(movie);
  }
}
