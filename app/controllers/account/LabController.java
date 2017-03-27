package controllers.account;

/**
 * Created by aniketchitale7 on 3/27/17.
 */
import com.fasterxml.jackson.databind.JsonNode;
import core.RoleCore;
import core.UserCore;
import models.RoleAccess;
import models.User;
import models.UserLabRole;
import org.apache.commons.mail.EmailException;
import play.Configuration;
import play.Logger;
import play.data.Form;
import play.data.FormFactory;
import play.data.validation.Constraints;
import play.db.jpa.JPA;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import play.i18n.Messages;
import play.libs.Json;
import play.libs.mailer.MailerClient;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;

import javax.inject.Inject;
import javax.persistence.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.*;
import java.util.List;

import service.LabService;
import service.UserService;
import utils.Constants;
import utils.Mail;

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
