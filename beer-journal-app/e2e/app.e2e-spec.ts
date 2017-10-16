import { BeerJournalAppPage } from './app.po';

describe('beer-journal-app App', () => {
  let page: BeerJournalAppPage;

  beforeEach(() => {
    page = new BeerJournalAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
