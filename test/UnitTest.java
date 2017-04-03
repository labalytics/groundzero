import controllers.Application;
import org.junit.Test;
import org.mockito.Mockito;
import play.api.libs.mailer.MailerClient;
import play.data.FormFactory;
import play.db.jpa.JPAApi;
import play.i18n.Messages;
import play.mvc.Result;
import play.twirl.api.Content;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.*;


/**
 * Simple (JUnit) tests that can call all parts of a play app.
 *
 * If you are interested in mocking a whole application, see the wiki for more details.
 * https://www.playframework.com/documentation/latest/JavaTest
 */
public class UnitTest {

  @Test
  public void checkIndex() {
    JPAApi jpaApi = Mockito.mock(JPAApi.class);
    FormFactory formFactory = Mockito.mock(FormFactory.class);
    MailerClient mailerClient = Mockito.mock(MailerClient.class);
    final Application controller = new Application(formFactory, jpaApi, mailerClient);
    final Result result = controller.index();

    assertEquals(OK, result.status());
  }

  @Test
  public void checkIndexTemplate() {
    Content html = views.html.app.welcome.render();

    assertEquals("text/html", html.contentType());
    assertTrue(contentAsString(html).contains("About"));
    assertTrue(contentAsString(html).contains("Contact"));
    assertTrue(contentAsString(html).contains("Login"));
  }
}
