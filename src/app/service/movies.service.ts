import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private chatURL = 'https://www.omdbapi.com/?';
  private key = '8cb915b';
  private movies = [];
  private moiveUpdated = new BehaviorSubject<any>([]);
  private fetching = new BehaviorSubject<any>(false);

  constructor(private http: HttpClient) { }

  // get all movies
  getAllMoives(title: string = null, page: number) {
    title = title === '' ? null : title;
    this.http.get<any>(this.chatURL + '&s=' + title + '&page=' + page + '&apikey=' + this.key).pipe(delay(500))
    .subscribe(args => {
      this.movies = args;
      this.moiveUpdated.next(this.movies);
      this.fetching.next(false);
    });
  }
  // get single movie detail
  getSingleMoive(imdbID: string) {
    return this.http.get<any>(this.chatURL + '&i=' + imdbID + '&apikey=' + this.key);
  }

  // get updated movies
  getMoiveUpdateListener() {
    return this.moiveUpdated.asObservable();
  }

  setMovieUpdate(movie) {
    this.moiveUpdated.next(movie);
  }

  getFetchingFlag() {
    return this.fetching.asObservable();
  }

  setFetchingFlag(flag) {
    this.fetching.next(flag);
  }

  defaultMovies() {
    return this.movies;
  }
}
