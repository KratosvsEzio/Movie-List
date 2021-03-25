import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { MoviesService } from '../../service/movies.service';
import { PageIndexService } from '../../service/page-index.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  isLoading: boolean;
  searchMovie: FormGroup;
  searchMovieList = new BehaviorSubject<any>(null);

  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService,
    private pageIndexService: PageIndexService
  ) {
    console.log('search Created');
  }

  ngOnInit() {
    this.searchMovie = this.fb.group({
      movie: new FormControl('', [
        Validators.required,
      ]),
    });

    this.searchMovies();

    this.moviesService.getFetchingFlag().subscribe( flag => this.isLoading = flag);

    this.searchMovieList.pipe(
      distinctUntilChanged(),
      debounceTime(400),
    ).subscribe( search => {
      this.moviesService.setFetchingFlag(true);
      this.searchMovies(search);
    })
  }

  search() {
    const value = this.searchMovie.controls.movie.value;
    this.searchMovieList.next(value);
  }

  searchMovies(search = null) {
    this.pageIndexService.currentPageIndex.subscribe( (index) => {
      this.moviesService.getAllMoives(search, index);
    });
  }

  searchMovieForm(form: FormGroup) {
    this.isLoading = true;
    if (form.invalid) {
      return;
    }
    const Movie = form.controls.movie.value;
    this.pageIndexService.currentPageIndex.subscribe( (index) => {
      this.moviesService.getAllMoives(Movie, index);
      this.isLoading = false;
    });
    form.reset();
  }

  get f() { return this.searchMovie.controls; }

}
