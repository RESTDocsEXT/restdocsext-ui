/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { PagesService } from '../../shared/services/pages';
import { MockPagesService } from '../../testing';

import { DocumentationComponent, DocumentationModule } from './index';

const HTML = '<h2>Content</h2>';

describe('component: DocumentationComponent', () => {
  let mockService: MockPagesService;

  beforeEach(() => {
    mockService = new MockPagesService();
    mockService.content = HTML;

    TestBed.configureTestingModule({
      imports: [ DocumentationModule ],
      providers: [
        { provide: PagesService, useValue: mockService }
      ]
    });
  });

  it('should contain content', async(() => {
    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(DocumentationComponent);
      fixture.detectChanges();

      let el = fixture.debugElement.nativeElement;
      expect(el.innerHTML).toContain(HTML);
    });
  }));

  it('should unsubscribe from pages subscription', async(() => {
    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(DocumentationComponent);
      fixture.detectChanges();
      fixture.destroy();

      expect(mockService.subscription.unsubscribe).toHaveBeenCalled();
    });
  }));
});
