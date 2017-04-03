package controllers.account;

/**
 * Created by aniketchitale7 on 3/27/17.
 */
import com.fasterxml.jackson.databind.JsonNode;
import play.Logger;
import play.data.FormFactory;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import play.i18n.Messages;
import play.libs.Json;
import play.libs.mailer.MailerClient;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.*;

import service.LabService;
import utils.Constants;

import core.ResponseCore;

import static play.libs.Json.newObject;
import static play.libs.Json.toJson;

public class LabController extends Controller {

  private final FormFactory formFactory;
  private final JPAApi jpaApi;
  private final MailerClient mailerClient;
  final Logger.ALogger logger = Logger.of(this.getClass());

  @Inject
  public LabController(FormFactory formFactory, JPAApi jpaApi, MailerClient mailerClient) {
    this.formFactory = formFactory;
    this.jpaApi = jpaApi;
    this.mailerClient = mailerClient;
  }

  @Transactional
  public Result addLabsForManager() {
    logger.debug("Adding Labs");
    ResponseCore oResponse = new ResponseCore();
    HashMap<String, Object> hash = new HashMap();
    try {
      JsonNode json = request().body().asJson();
      String email = json.findPath("email").textValue();
      LabService labService = new LabService();
      String sStatus = labService.addLabs(jpaApi, json , email);
      hash.put("registration", sStatus);
      oResponse.status = Constants.RESPONSE_SUCCESS;
      oResponse.message = "Lab Added Successfully";
      oResponse.response = hash;

    } catch (Exception e) {
      logger.error("Authorize.save error", e);
      flash("error", Messages.get("error.technical"));
      oResponse.status = Constants.RESPONSE_EXCEPTION;
      oResponse.message = Constants.REGISTRATION_FAILURE;
      oResponse.response = null;
    }
    return ok(Json.toJson(oResponse));
  }


}
