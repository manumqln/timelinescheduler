import { FullcalendarPage } from './app.po';

describe('fullcalendar App', () => {
  let page: FullcalendarPage;

  beforeEach(() => {
    page = new FullcalendarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
