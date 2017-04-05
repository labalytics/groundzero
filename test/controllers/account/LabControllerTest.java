package controllers.account;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.powermock.modules.junit4.PowerMockRunner;
import play.Logger;
import play.api.libs.mailer.MailerClient;
import play.data.FormFactory;
import play.db.jpa.JPAApi;

/**
 * Created by siddhujz on 4/3/2017.
 */

@RunWith(PowerMockRunner.class)
public class LabControllerTest {

  @Mock
  private FormFactory formFactory;
  @Mock
  private JPAApi jpaApi;
  @Mock
  private MailerClient mailerClient;
  @Mock
  Logger.ALogger logger;

  @InjectMocks
  LabController labController;

  @Before
  public void setUp() throws Exception {
    MockitoAnnotations.initMocks(this);
  }

  @Test
  public void addLabsForManager() throws Exception {
//    PowerMockito.mockStatic(LabCore.class);
//    Result result = labController.addLabsForManager();
//    assertEquals(OK, result.status());
  }

}
