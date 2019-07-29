import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageIndexService {

  private pageIndex = new BehaviorSubject<number>(1);
  currentPageIndex = this.pageIndex.asObservable();

  constructor() { }

  changePageIndex(pageIndex: number) {
    this.pageIndex.next(pageIndex);
  }
}
