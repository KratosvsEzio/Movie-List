import { TestBed } from '@angular/core/testing';

import { PageIndexService } from './page-index.service';

describe('PageIndexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageIndexService = TestBed.get(PageIndexService);
    expect(service).toBeTruthy();
  });
});
