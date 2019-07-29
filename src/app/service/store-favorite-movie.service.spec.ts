import { TestBed } from '@angular/core/testing';

import { StoreFavoriteMovieService } from './store-favorite-movie.service';

describe('StoreFavoriteMovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreFavoriteMovieService = TestBed.get(StoreFavoriteMovieService);
    expect(service).toBeTruthy();
  });
});
