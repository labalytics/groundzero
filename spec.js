describe('Labalytics Testing', function() {
  it('should have a title', function() {
    browser.get('http://localhost:9000/');
    //console.log(browser.getTitle());
    expect(browser.getTitle()).toEqual('main');
  });
});
