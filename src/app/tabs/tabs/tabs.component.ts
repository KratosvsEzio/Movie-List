import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { MoviesService } from '../../service/movies.service';
import { PageIndexService } from '../../service/page-index.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  isLoading: boolean;
  searchMovie: FormGroup;

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
