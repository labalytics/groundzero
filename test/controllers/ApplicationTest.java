package controllers;

import com.google.inject.Inject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import play.Application;
import play.Mode;
import play.api.libs.mailer.MailerClient;
import play.data.FormFactory;
import play.db.jpa.JPAApi;
import play.inject.guice.GuiceApplicationBuilder;
import play.mvc.Result;
import play.test.WithApplication;

import java.io.File;

import static org.junit.Assert.*;
import static play.inject.Bindings.bind;
import static play.mvc.Http.Status.OK;
import static play.test.Helpers.*;

/**
 * Created by siddhujz on 3/22/2017.
 */
@RunWith(MockitoJUnitRunner.class)
public class ApplicationTest extends WithApplication {

  @Mock
  private FormFactory formFactory;
  @Mock
  private JPAApi jpaApi;
  @Mock
  private MailerClient mailerClient;

  @InjectMocks
  controllers.Application application;

  @Test
  public void testIndex() {
    Result result = application.index();
    assertEquals(OK, result.status());
    assertEquals("text/html", result.contentType().get());
    assertEquals("utf-8", result.charset().get());
    assertTrue(contentAsString(result).contains("Login"));
  }

  @Test
  public void testGetstudent() {

  }

  @Test
  public void testGetAllLabs() {

  }

}
