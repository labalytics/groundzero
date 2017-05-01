package controllers.account;

/**
 * Created by aniketchitale7 on 3/27/17.
 */
import com.fasterxml.jackson.databind.JsonNode;
import core.LabCore;
import models.Lab;
import models.LabPermission;
import models.UserLabRole;
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
import utils.Mailer;

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
      String sStatus = labService.addLabs(jpaApi, json , email , mailerClient);
      hash.put("registration", sStatus);
      oResponse.status = Constants.RESPONSE_SUCCESS;
      oResponse.message = "Lab Added Successfully";
      oResponse.response = hash;
      //Send Email


    } catch (Exception e) {
      logger.error("Authorize.save error", e);
      flash("error", Messages.get("error.technical"));
      oResponse.status = Constants.RESPONSE_EXCEPTION;
      oResponse.message = Constants.REGISTRATION_FAILURE;
      oResponse.response = null;
    }
    return ok(Json.toJson(oResponse));
  }

  @Transactional
  public Result getAllLabs(){
    JsonNode json = request().body().asJson();
    String email = json.findPath("email").textValue();
    long roleId = json.findPath("roleId").asLong();
    System.out.println("Value of Email is" + email);
    HashMap<String, Object> hash = new HashMap();
    ArrayList<UserLabRole> labs =  LabCore.GetAllLabs(jpaApi , email, roleId);
    hash.put("labs",labs);
    ArrayList<LabPermission> refInLabs = null;
    ArrayList<LabPermission> refOutLabs = null;
    if(roleId!=3)
    {
      ArrayList labIds = new ArrayList();
      for(UserLabRole userLabRole: labs)
      {
        labIds.add(userLabRole.labId.id);
      }
      refInLabs = LabCore.getReferedLabs(jpaApi,labIds);
      refOutLabs = LabCore.getReferedOutLabs(jpaApi,labIds);
    }
    hash.put("refInLabs",refInLabs);
    hash.put("refOutLabs",refOutLabs);
    return ok(Json.toJson(hash));
  }

  @Transactional
  public Result labAccessRequest()
  {
    ResponseCore oResponse = new ResponseCore();
    JsonNode json = request().body().asJson();
    long currentLabId = json.findPath("currentLabId").asLong();
    long requestedLabId = json.findPath("requestedLabId").asLong();
    LabService labService = new LabService();
    oResponse.status = labService.createLabRequest(jpaApi, currentLabId, requestedLabId);
    oResponse.message = oResponse.status;
    return ok(Json.toJson(oResponse));
  }

  @Transactional
  public Result getNotReferedLabs()
  {
    JsonNode json = request().body().asJson();
    String email = json.findPath("email").textValue();
    long roleId = json.findPath("roleId").asLong();
    HashMap<String, Object> hash = new HashMap();
    ArrayList<UserLabRole> labs =  LabCore.GetAllLabs(jpaApi , email, roleId);
    long labId = json.findPath("LabidA").asLong();
    ArrayList labIds = new ArrayList();
    for(UserLabRole userLabRole: labs)
    {
      labIds.add(userLabRole.labId.id);
    }
    ArrayList<Lab> notRefLabs = null;
    notRefLabs = LabCore.getNotReferedLabs(jpaApi, labId, labIds);
    hash.put("notRefLabs", notRefLabs);
    return ok(Json.toJson(hash));
  }

  @Transactional
  public Result GetLabRequests()
  {
    HashMap<String, Object> hash = new HashMap();
    JsonNode json = request().body().asJson();
    String email = json.findPath("email").textValue();

    hash.put("requests", LabService.GetLabRequests(jpaApi, email));
    return ok(Json.toJson(hash));
  }

  @Transactional
  public Result AcceptLabRequest()
  {
    ResponseCore oResponse = new ResponseCore();
    HashMap<String, Object> hash = new HashMap();
    JsonNode json = request().body().asJson();
    long id = json.findPath("reqId").asLong();
    String value = json.findPath("value").textValue();
    oResponse.status = LabService.AcceptLabRequest(jpaApi, id, value);
    oResponse.message = oResponse.status;
    return ok(Json.toJson(oResponse));
  }

}
