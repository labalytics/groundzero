package controllers.account;

/**
 * Created by aniketchitale7 on 3/27/17.
 */

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import core.ResponseCore;
import play.Logger;
import play.data.FormFactory;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import play.i18n.Messages;
import play.libs.Json;
import play.libs.mailer.MailerClient;
import play.mvc.Controller;
import play.mvc.Result;
import service.EquipmentService;
import service.StudentService;
import utils.Constants;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Iterator;

public class EquipmentController extends Controller {

  private final FormFactory formFactory;
  private final JPAApi jpaApi;
  private final MailerClient mailerClient;
  final Logger.ALogger logger = Logger.of(this.getClass());

  @Inject
  public EquipmentController(FormFactory formFactory, JPAApi jpaApi, MailerClient mailerClient) {
    this.formFactory = formFactory;
    this.jpaApi = jpaApi;
    this.mailerClient = mailerClient;
  }

  @Transactional
  public Result GetEquipments() {
    logger.debug("Adding Labs");
    ResponseCore oResponse = new ResponseCore();
    HashMap<String, Object> hash = new HashMap();
    try {
      JsonNode json = request().body().asJson();
      Iterator<JsonNode> iterator = json.elements();
      ArrayNode arrayNode = (ArrayNode) json.findPath("id");
      EquipmentService equipmentService = new EquipmentService();
      hash.put("equipments", equipmentService.GetEquipments(jpaApi,arrayNode));
      hash.put("units", equipmentService.GetEquipmentsUnits(jpaApi,arrayNode));
      oResponse.status = Constants.RESPONSE_SUCCESS;
      oResponse.message = "Success";
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


  @Transactional
  public Result AddEquipment() {
    logger.debug("Adding Labs");
    ResponseCore oResponse = new ResponseCore();
    HashMap<String, Object> hash = new HashMap();
    try {
      JsonNode json = request().body().asJson();
      EquipmentService equipmentService = new EquipmentService();
      equipmentService.AddEquipment(jpaApi,json);
      oResponse.status = Constants.RESPONSE_SUCCESS;
      oResponse.message = "Success";
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
