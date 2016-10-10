import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GENERAL_ROOT_PATH, OPERATIONS_ROOT_PATH } from '../../app.properties';
import { OperationsService } from '../../shared/services/operations';
import { PagesService } from '../../shared/services/pages';
import { makeUrlFriendly } from '../../shared/util';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainContentComponent implements OnInit, OnDestroy {

  isOperation: boolean = false;

  private routeSubscription: Subscription;

  constructor(private pages: PagesService,
              private operations: OperationsService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeSubscription = this.route.url.subscribe(url => {
      const root = url[0].path;
      const name = url[1].path;
      if (root === GENERAL_ROOT_PATH) {
        this.isOperation = false;
        this.pages.currentPage = this.getPath(false, name);
      } else if (root === OPERATIONS_ROOT_PATH) {
        this.isOperation = true;
        this.pages.currentPage = this.getPath(true, name);
        let op = this.operations.findOperation(name);
        this.operations.currentOperation = op;
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private getPath(isOperation, name) {
    if (!isOperation) {
      return `${GENERAL_ROOT_PATH}/${name}`;
    } else {
      let op = this.operations.findOperation(name);
      let coll = op.collection;
      return `collections/${makeUrlFriendly(coll)}/${name}`;
    }
  }
}
