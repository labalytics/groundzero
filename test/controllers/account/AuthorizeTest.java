package controllers.account;

import core.UserCore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import play.api.libs.mailer.MailerClient;
import play.data.FormFactory;
import play.db.jpa.JPAApi;
import play.mvc.Result;
import utils.Constants;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;
import static play.mvc.Http.Status.OK;

/**
 * Created by siddhujz on 3/23/2017.
 */

// @RunWith attaches a runner with the test class to initialize the test data
@RunWith(MockitoJUnitRunner.class)
public class AuthorizeTest {

  @Mock
  private FormFactory formFactory;
  @Mock
  private JPAApi jpaApi;
  @Mock
  private MailerClient mailerClient;

  //@InjectMocks annotation is used to create and inject the mock object
  @InjectMocks
  Authorize authorize = new Authorize(formFactory, jpaApi, mailerClient);

  @Test
  public void testGetAuthorizeView() {
    Result result = authorize.GetAuthorizeView();
    assertEquals(OK, result.status());
  }

  @Test
  public void testValidateUser() {
    UserCore userCore = mock(UserCore.class);

    //mock the behavior of stock service to return the value of various stocks
    //when(stockService.getPrice(googleStock)).thenReturn(50.00);

    //mock the behavior of user service to return the user
    when(userCore.authenticate(jpaApi, "siddhujz@gmail.com", "welcome123")).thenReturn(Constants.SUCCESS);
    when(userCore.authenticate(jpaApi, "siddhujz@gmail.com", "incorrect")).thenReturn(Constants.INCORRECT_PASSWORD);
    when(userCore.authenticate(jpaApi, "incorrect@gmail.com", "incorrect")).thenReturn(Constants.USER_NOT_FOUND);

    assertEquals(userCore.authenticate(jpaApi, "siddhujz@gmail.com", "welcome123"), Constants.SUCCESS);
    assertEquals(userCore.authenticate(jpaApi, "siddhujz@gmail.com", "incorrect"), Constants.INCORRECT_PASSWORD);
    assertEquals(userCore.authenticate(jpaApi, "incorrect@gmail.com", "incorrect"), Constants.USER_NOT_FOUND);
  }

  @Test
  public void testGetRoleAccess() {
  }

  @Test
  public void testGetMenuItems() {
  }

  @Test
  public void testGetRoleAndMenuItems() {
  }

  @Test
  public void testRegistration() {
  }

  @Test
  public void testConfirm() {
    Result result = authorize.confirm("hfhf");

  }

  @Test
  public void testRegister() {

    Result result = authorize.register();
    assertEquals(OK, result.status());
  }

}
