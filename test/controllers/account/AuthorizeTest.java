package controllers.account;

import core.UserCore;
import models.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
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
@RunWith(PowerMockRunner.class)
public class AuthorizeTest {

  @Mock
  private FormFactory formFactory;
  @Mock
  private JPAApi jpaApi;
  @Mock
  private MailerClient mailerClient;

  //@InjectMocks annotation is used to create and inject the mock object
  @InjectMocks
  Authorize authorize;
  //Authorize authorize = new Authorize(formFactory, jpaApi, mailerClient);

  @Before
  public void setUp() throws Exception {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  public void testGetAuthorizeView() {
    Result result = authorize.GetAuthorizeView();
    assertEquals(OK, result.status());
  }

  @PrepareForTest({UserCore.class})
  @Test
  public void testValidateUserCorrectUsernameAndPassword() {
    /**
     * Given
     */
    User user = new User();
    user.email = "siddhujz@gmail.com";
    user.passwordHash = "welcome123";
    PowerMockito.mockStatic(UserCore.class);
    //mock the behavior of UserCore.authenticate to return the value, when the following data is given as input
    PowerMockito.when(UserCore.authenticate(jpaApi, "siddhujz@gmail.com", "welcome123")).thenReturn(Constants.SUCCESS);

    /**
     * When
     */
    String validate = UserCore.authenticate(jpaApi, user.email, user.passwordHash);

    /**
     * Then
     */
    assertEquals(validate, (Constants.SUCCESS));

    //Verify that UserCore.authenticate was called
    PowerMockito.verifyStatic();
    UserCore.authenticate(jpaApi, user.email, user.passwordHash);
  }

  @PrepareForTest({UserCore.class})
  @Test
  public void testValidateUserIncorrectPassword() {
    /**
     * Given
     */
    User user = new User();
    user.email = "siddhujz@gmail.com";
    user.passwordHash = "incorrect";
    PowerMockito.mockStatic(UserCore.class);
    //mock the behavior of UserCore.authenticate to return the value, when the following data is given as input
    PowerMockito.when(UserCore.authenticate(jpaApi, "siddhujz@gmail.com", "welcome123")).thenReturn(Constants.SUCCESS);
    PowerMockito.when(UserCore.authenticate(jpaApi, "siddhujz@gmail.com", "incorrect")).thenReturn(Constants.INCORRECT_PASSWORD);

    /**
     * When
     */
    String validate = UserCore.authenticate(jpaApi, user.email, user.passwordHash);

    /**
     * Then
     */
    assertNotEquals(validate, (Constants.SUCCESS));
    assertEquals(validate, (Constants.INCORRECT_PASSWORD));

    //Verify that UserCore.authenticate was called
    PowerMockito.verifyStatic();
    UserCore.authenticate(jpaApi, user.email, user.passwordHash);
  }

  @PrepareForTest({UserCore.class})
  @Test
  public void testValidateUserIncorrectUsernameAndPassword() {
    /**
     * Given
     */
    User user = new User();
    user.email = "incorrect@gmail.com";
    user.passwordHash = "incorrect";
    PowerMockito.mockStatic(UserCore.class);
    //mock the behavior of UserCore.authenticate to return the value, when the following data is given as input
    PowerMockito.when(UserCore.authenticate(jpaApi, "siddhujz@gmail.com", "welcome123")).thenReturn(Constants.SUCCESS);
    PowerMockito.when(UserCore.authenticate(jpaApi, "incorrect@gmail.com", "incorrect")).thenReturn(Constants.USER_NOT_FOUND);

    /**
     * When
     */
    String validate = UserCore.authenticate(jpaApi, user.email, user.passwordHash);

    /**
     * Then
     */
    assertNotEquals(validate, (Constants.SUCCESS));
    assertNotEquals(validate, (Constants.SUCCESS));

    //Verify that UserCore.authenticate was called
    PowerMockito.verifyStatic();
    UserCore.authenticate(jpaApi, user.email, user.passwordHash);
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
