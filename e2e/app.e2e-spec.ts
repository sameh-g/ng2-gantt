import { OncliPage } from './app.po';

describe('oncli App', function() {
  let page: OncliPage;

  beforeEach(() => {
    page = new OncliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
