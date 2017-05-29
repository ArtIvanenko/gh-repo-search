import { GhReposPage } from './app.po';

describe('gh-repos App', () => {
  let page: GhReposPage;

  beforeEach(() => {
    page = new GhReposPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
