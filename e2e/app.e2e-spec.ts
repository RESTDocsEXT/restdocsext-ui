import { PlaygroundUiPage } from './app.po';

describe('playground-ui App', function() {
  let page: PlaygroundUiPage;

  beforeEach(() => {
    page = new PlaygroundUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
