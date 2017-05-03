describe('Labalytics Testing', function() {
  it('should have a title', function() {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:9000/');
    expect(browser.getTitle()).toEqual('Labalytics - A complete Enterprise Solution for your Lab');
  });
});

describe('Login Page', function() {
  it('should have a Login', function() {
    browser.get('http://localhost:9000/authorize#/login');
    expect(browser.getTitle()).toEqual('Labalytics - A complete Enterprise Solution for your Lab');
  });

  it('should redirect to login page', function() {
    browser.get('http://localhost:9000/');
    element(by.css('a[href*="/authorize"]')).click();
    expect(browser.getTitle()).toEqual('Labalytics - A complete Enterprise Solution for your Lab');
  });

  it('should redirect me to the homepage if i go back from the login', function() {
    browser.navigate().back();
    expect(browser.getCurrentUrl()).toBe('http://localhost:9000/');
  });
});

describe('Signup Page', function() {
  it('should have a Signup', function() {
    browser.get('http://localhost:9000/authorize#/signup');
    expect(browser.getTitle()).toEqual('Labalytics - A complete Enterprise Solution for your Lab');
  });
});

describe('About Page', function() {
  it('should have an about page', function() {
    browser.get('http://localhost:9000/#about');
    expect(browser.getTitle()).toEqual('Labalytics - A complete Enterprise Solution for your Lab');
  });

  it('should redirect to About page', function() {
    browser.get('http://localhost:9000/');
    element(by.css('a[href*="#about"]')).click();
    expect(browser.getTitle()).toEqual('Labalytics - A complete Enterprise Solution for your Lab');
  });
});

describe('Contact Page', function() {
  it('should have an contact page', function() {
    browser.get('http://localhost:9000/#contact');
    expect(browser.getTitle()).toEqual('Labalytics - A complete Enterprise Solution for your Lab');
  });

  it('should redirect to Contact page', function() {
    browser.get('http://localhost:9000/');
    element(by.css('a[href*="#contact"]')).click();
    expect(browser.getTitle()).toEqual('Labalytics - A complete Enterprise Solution for your Lab');
  });
});
