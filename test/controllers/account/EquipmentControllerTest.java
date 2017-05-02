package controllers.account;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Equipment;
import models.EquipmentUnit;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import play.Logger;
import play.api.libs.mailer.MailerClient;
import play.data.FormFactory;
import play.db.jpa.JPAApi;
import play.libs.Json;
import service.EquipmentService;
import service.StudentService;
import utils.Constants;

import java.util.ArrayList;

import static org.junit.Assert.assertEquals;

/**
 * Created by siddhujz on 4/3/2017.
 */

// @RunWith attaches a runner with the test class to initialize the test data
@RunWith(PowerMockRunner.class)
public class EquipmentControllerTest {

  @Mock
  private FormFactory formFactory;
  @Mock
  private JPAApi jpaApi;
  @Mock
  private MailerClient mailerClient;

  @InjectMocks
  EquipmentController equipmentController;

  @Before
  public void setUp() throws Exception {
    MockitoAnnotations.initMocks(this);
  }

  @PrepareForTest({EquipmentService.class})
  @Test
  public void testGetEquipments() throws Exception {
    /**
     * Given
     */
    ArrayNode arrayNode = Json.newArray();

    ObjectNode result = Json.newObject();
    result.put("id", "testid");
    arrayNode.add(result);

    ArrayList<EquipmentUnit> equipmentUnits = new ArrayList<EquipmentUnit>();

    PowerMockito.mockStatic(EquipmentService.class);
    //mock the behavior of EquipmentService.GetEquipments to return the value, when the following data is given as input
    //PowerMockito.when(EquipmentService.GetEquipments(jpaApi, arrayNode)).thenReturn(equipmentUnits);

    /**
     * When
     */
    ArrayList<Equipment> validate = EquipmentService.GetEquipments(jpaApi, arrayNode);

    /**
     * Then
     */
    assertEquals(validate, equipmentUnits);

    //Verify that UserCore.authenticate was called
    PowerMockito.verifyStatic();
    EquipmentService.GetEquipments(jpaApi, arrayNode);
  }

  @Test
  public void testAddEquipment() throws Exception {
  }

}
