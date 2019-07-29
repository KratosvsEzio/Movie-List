import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreFavoriteMovieService {

  private favoriteMovies = new BehaviorSubject<any>([]);
  currentFavoriteMovies = this.favoriteMovies.asObservable();

  constructor() {
    this.changeFavoriteMovies(JSON.parse(localStorage.getItem('favoriteMovies')));
  }

  storeFavoriteMovie(favoriteMovie: any) {
    const array: any = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    array.push(favoriteMovie);
    const result = [];
    const map = new Map();
    if (array) {
      for (const item of array) {
        console.log(array);
        if (!map.has(item.imdbID)) {
          map.set(item.imdbID, true);    // set any value to Map
          result.push(item);
        }
      }
      if ( array.length === 0) {
        result.push(favoriteMovie);
        console.log(result);
      }
    }
    this.changeFavoriteMovies(result);
    localStorage.setItem('favoriteMovies', JSON.stringify(result));
    console.log(map);
    console.log(array);
  }

  changeFavoriteMovies(favoriteMovies: any) {
    this.favoriteMovies.next(favoriteMovies);
  }

  getFavoriteMovie() {
    return JSON.parse(localStorage.getItem('favoriteMovies'));
  }

  removeFavoriteMovie(movie) {
    const array = this.getFavoriteMovie();
    for ( let i = 0; i < array.length; i++) {
      if ( array[i].imdbID === movie.imdbID ) {
        array.splice(i, 1);
      }
    }
    this.changeFavoriteMovies(array);
    localStorage.setItem('favoriteMovies', JSON.stringify(array));
  }
}
