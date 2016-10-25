import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PagesService } from '../../shared/services/pages';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit, OnDestroy {

  page: string;

  private pageSubscription: Subscription;

  constructor(private pages: PagesService) { }

  ngOnInit() {
    this.pageSubscription = this.pages.currentPage$.subscribe(page => {
      this.page = page;
    });
  }

  ngOnDestroy() {
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
  }
}
