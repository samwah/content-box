import { ContentBoxPage } from './app.po';

describe('content-box App', function() {
  let page: ContentBoxPage;

  beforeEach(() => {
    page = new ContentBoxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
