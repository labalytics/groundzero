describe('Labalytics Testing', function() {
  it('should have a title', function() {
    browser.get('http://localhost:9000/');
    expect(browser.getTitle()).toEqual('main');
  });
});

describe('Labalytics Testing', function() {
  it('should have a Login', function() {
    browser.get('http://localhost:9000/authorize#/login');
    expect(browser.getTitle()).toEqual('login');
  });
});

describe('Labalytics Testing', function() {
  it('should have a Signup', function() {
    browser.get('http://localhost:9000/authorize#/login');
    expect(browser.getTitle()).toEqual('login');
  });
});

describe('Labalytics Testing', function() {
  it('should have an about page', function() {
    browser.get('http://localhost:9000/#about');
    expect(browser.getTitle()).toEqual('main');
  });
});

describe('Labalytics Testing', function() {
  it('should have an contact page', function() {
    browser.get('http://localhost:9000/#contact');
    expect(browser.getTitle()).toEqual('main');
  });
});
