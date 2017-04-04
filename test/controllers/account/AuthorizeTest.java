package controllers.account;

import com.fasterxml.jackson.databind.node.ObjectNode;
import core.UserCore;
import models.User;
import models.UserLabRole;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import play.api.libs.mailer.MailerClient;
import play.data.FormFactory;
import play.db.jpa.JPAApi;
import play.libs.Json;
import play.mvc.Result;
import utils.Constants;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
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
  @PrepareForTest({UserCore.class})
  @Test
  public void testGetRoleAccess() {
    /**
     * Given
     */
    ArrayList<UserLabRole> res = new ArrayList<UserLabRole>();

    PowerMockito.mockStatic(UserCore.class);
    //mock the behavior of UserCore.authenticate to return the value, when the following data is given as input
    PowerMockito.when(UserCore.getUserLabRole(jpaApi, "ankur.shri@gmail.com")).thenReturn(res);
    //PowerMockito.when(UserCore.authenticate(jpaApi, "incorrect@gmail.com", "incorrect")).thenReturn(Constants.USER_NOT_FOUND);

    /**
     * When
     */
    ArrayList<UserLabRole> validate = UserCore.getUserLabRole(jpaApi, "ankur.shri@gmail.com");

    /**
     * Then
     */
    assertEquals(validate, res);
    //assertNotEquals(validate, (Constants.SUCCESS));

    //Verify that UserCore.authenticate was called
    //PowerMockito.verifyStatic();
    //UserCore.getUserLabRole(jpaApi, "siddhujz@gmail.com");
  }


//  @Test
//  public void testGetRoleAccess() {
//  }

  @Test
  public void testGetMenuItems() {
  }

  @Test
  public void testGetRoleAndMenuItems() {
  }

  @PrepareForTest({UserCore.class})
  @Test
  public void testRegistration() {
    /**
     * Given
     */
    ObjectNode result = Json.newObject();
    result.put("first_name", "TestFirstName");
    result.put("last_name", "TestLastName");
    result.put("email", "testuser@gmail.com");
    result.put("password", "testpassword@gmail.com");

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
  @PrepareForTest({UserCore.class})
  @Test
  public void testConfirmforuser() {
    //Result result = authorize.confirm("hfhf");
    User user = new User();
    user.email = "ankur.shri@gmail.com";
    user.passwordHash = "ankur";
    user.firstName = "Ankur";
    user.id = (long) 172863863;
    user.lastName = "Shrivastava";
    user.confirmationToken = "asghs";
    user.validated = true;

    PowerMockito.mockStatic(UserCore.class);
    //mock the behavior of UserCore.authenticate to return the value, when the following data is given as input
    PowerMockito.when(UserCore.findByConfirmationToken(jpaApi,"asghs")).thenReturn(user);

    User userreturn = UserCore.findByConfirmationToken(jpaApi, user.confirmationToken);
    assertEquals(userreturn, user);

  }
  @PrepareForTest({UserCore.class})
  @Test
  public void testConfirmforwronguser() {
    //Result result = authorize.confirm("hfhf");
    User user = new User();
    user.email = "ankur.shri@gmail.com";
    user.passwordHash = "ankur";
    user.firstName = "Ankur";
    user.id = (long) 172863863;
    user.lastName = "Shrivastava";
    user.confirmationToken = "ghjj";
    user.validated = true;

    PowerMockito.mockStatic(UserCore.class);
    //mock the behavior of UserCore.authenticate to return the value, when the following data is given as input
    PowerMockito.when(UserCore.findByConfirmationToken(jpaApi,"asghs")).thenReturn(user);

    User userreturn = UserCore.findByConfirmationToken(jpaApi, user.confirmationToken);
    assertNotEquals(userreturn, user);

  }
  @PrepareForTest({UserCore.class})
  @Test
  public void testConfirmfornulluser() {
    //Result result = authorize.confirm("hfhf");
//    User user = new User();
//    user.email = "ankur.shri@gmail.com";
//    user.passwordHash = "ankur";
//    user.firstName = "Ankur";
//    user.id = (long) 172863863;
//    user.lastName = "Shrivastava";
//    user.confirmationToken = "ghjj";
//    user.validated = true;

    PowerMockito.mockStatic(UserCore.class);
    //mock the behavior of UserCore.authenticate to return the value, when the following data is given as input
    //PowerMockito.when(UserCore.findByConfirmationToken(jpaApi,"asghs")).thenReturn(user);

    User userreturn = UserCore.findByConfirmationToken(jpaApi, "asghs");
    assertEquals(userreturn, null);

  }


  @Test
  public void testRegister() {

    Result result = authorize.register();
    assertEquals(OK, result.status());
  }

}
