import org.junit.Assert;
import org.junit.Test;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import play.i18n.Messages;

import static org.hamcrest.CoreMatchers.containsString;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static play.test.Helpers.*;

public class AcceptanceTest {

  /**
   * in this example we just check if the welcome page is being shown
   */
  @Test
  public void test() {
    running(testServer(9000, fakeApplication(inMemoryDatabase())), HTMLUNIT, browser -> {
      browser.goTo("http://localhost:9000");
      assertThat(browser.pageSource(), containsString("Login"));
      assertNotNull(browser.$("title").getText());
    });
  }

  @Test 
  public void verifytitle() { 
    WebDriver driver = new HtmlUnitDriver();
     driver.get("http://localhost:9000/"); 
    String title = driver.getTitle(); 
    System.out.println(title); 
    Assert.assertTrue(title.contains("Labalytics")); 
  }

}
