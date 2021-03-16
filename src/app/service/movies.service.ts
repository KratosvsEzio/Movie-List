import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private chatURL = 'https://www.omdbapi.com/?';
  private key = '8cb915b';
  private movies = [];
  private moiveUpdated = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  // get all movies
  getAllMoives(title: string, page: number) {
    this.http.get<any>(this.chatURL + '&s=' + title + '&page=' + page + '&apikey=' + this.key)
      .subscribe(args => {
        this.movies = args;
        this.moiveUpdated.next(this.movies);
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

  defaultMovies() {
    return this.movies;
  }
}
