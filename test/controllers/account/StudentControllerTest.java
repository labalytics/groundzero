package controllers.account;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import play.api.libs.mailer.MailerClient;
import play.data.FormFactory;
import play.db.jpa.JPAApi;
import play.libs.Json;
import service.StudentService;
import utils.Constants;

import java.util.ArrayList;

import static org.junit.Assert.*;

/**
 * Created by siddhujz on 4/3/2017.
 */

// @RunWith attaches a runner with the test class to initialize the test data
@RunWith(PowerMockRunner.class)
public class StudentControllerTest {

  @Mock
  private FormFactory formFactory;
  @Mock
  private JPAApi jpaApi;
  @Mock
  private MailerClient mailerClient;

  //@InjectMocks annotation is used to create and inject the mock object
  @InjectMocks
  StudentController studentController;

  @Before
  public void setUp() throws Exception {
    MockitoAnnotations.initMocks(this);
  }

  @PrepareForTest({StudentService.class})
  @Test
  public void testAddStudentsSuccessful() throws Exception {
    /**
     * Given
     */
    ArrayNode arrayNode = Json.newArray();

    ObjectNode result = Json.newObject();
    result.put("id", "testid");
    result.put("firstName", "TestFirstName");
    result.put("lastName", "TestLastName");
    result.put("email", "testuser@gmail.com");
    result.put("labid", "testlabid");
    arrayNode.add(result);

    PowerMockito.mockStatic(StudentService.class);
    //mock the behavior of UserCore.authenticate to return the value, when the following data is given as input
    PowerMockito.when(StudentService.addStudents(jpaApi, arrayNode, mailerClient)).thenReturn(Constants.REGISTRATION_SUCCESS);

    /**
     * When
     */
    String validate = StudentService.addStudents(jpaApi, arrayNode, mailerClient);

    /**
     * Then
     */
    assertEquals(validate, (Constants.REGISTRATION_SUCCESS));

    //Verify that UserCore.authenticate was called
    PowerMockito.verifyStatic();
    StudentService.addStudents(jpaApi, arrayNode, mailerClient);
  }

  @PrepareForTest({StudentService.class})
  @Test
  public void testAddStudentsFailed() throws Exception {
    /**
     * Given
     */
    ArrayNode arrayNode = Json.newArray();

    ObjectNode result = Json.newObject();
    result.put("id", "testidFailure");
    result.put("firstName", "TestFirstNameFailure");
    result.put("lastName", "TestLastNameFailure");
    result.put("email", "failure@gmail.com");
    result.put("labid", "testlabidFailure");
    arrayNode.add(result);

    PowerMockito.mockStatic(StudentService.class);
    //mock the behavior of UserCore.authenticate to return the value, when the following data is given as input
    PowerMockito.when(StudentService.addStudents(jpaApi, arrayNode, mailerClient)).thenReturn(Constants.STUDENT_FAILURE);

    /**
     * When
     */
    String validate = StudentService.addStudents(jpaApi, arrayNode, mailerClient);

    /**
     * Then
     */
    assertEquals(validate, (Constants.STUDENT_FAILURE));

    //Verify that UserCore.authenticate was called
    PowerMockito.verifyStatic();
    StudentService.addStudents(jpaApi, arrayNode, mailerClient);
  }

}
