import { TodoFrontendAngularPage } from './app.po';

describe('todo-frontend-angular App', () => {
  let page: TodoFrontendAngularPage;

  beforeEach(() => {
    page = new TodoFrontendAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
