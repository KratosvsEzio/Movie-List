import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../service/movies.service';
import { PageIndexService } from '../../service/page-index.service';
import { StoreFavoriteMovieService } from '../../service/store-favorite-movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies = [];
  @Input() tab: number;
  pageIndex: number;
  maxPageIndex: number;

  constructor(
    private moviesService: MoviesService,
    private pageIndexService: PageIndexService,
    private storeFavoriteMovieService: StoreFavoriteMovieService,
  ) {
    console.log('movies list Created');
  }

  ngOnInit() {
    // this.movies = this.moviesService.defaultMovies();
    if (this.tab == 1) {
      this.moviesService.getMoiveUpdateListener().subscribe( (movies) => {
        this.movies = movies.Search;
        this.maxPageIndex = Math.ceil(movies.totalResults / 10);
      });
      this.pageIndexService.currentPageIndex.subscribe( (index) => {
        this.pageIndex = index;
      });
    } else if (this.tab == 2) {
      this.storeFavoriteMovieService.currentFavoriteMovies.subscribe( (favoriteMovies) => {
        console.log(favoriteMovies);
        this.movies = favoriteMovies;
      });
    }
  }

  previous() {
    this.pageIndexService.changePageIndex(this.pageIndex - 1);
  }

  next() {
    this.pageIndexService.changePageIndex(this.pageIndex + 1);
  }

  favorite(movie: any) {
    this.storeFavoriteMovieService.storeFavoriteMovie(movie);
  }

  remove(movie: any) {
    this.storeFavoriteMovieService.removeFavoriteMovie(movie);
  }

}
