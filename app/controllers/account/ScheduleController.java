package controllers.account;

/**
 * Created by aniketchitale7 on 3/27/17.
 */

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import core.ResponseCore;
import core.StudentCore;
import models.Equipment;
import models.EquipmentUnit;
import models.Schedule;
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
import service.ScheduleService;
import service.StudentService;
import utils.Constants;

import javax.inject.Inject;
import java.text.DateFormat;
import java.util.*;
import java.text.SimpleDateFormat;

public class ScheduleController extends Controller {

  private final FormFactory formFactory;
  private final JPAApi jpaApi;
  private final MailerClient mailerClient;
  final Logger.ALogger logger = Logger.of(this.getClass());

  @Inject
  public ScheduleController(FormFactory formFactory, JPAApi jpaApi, MailerClient mailerClient) {
    this.formFactory = formFactory;
    this.jpaApi = jpaApi;
    this.mailerClient = mailerClient;
  }

  @Transactional
  public Result GetAvailable() {
    logger.debug("Adding Labs");
    ResponseCore oResponse = new ResponseCore();
    HashMap<String, Object> hash = new HashMap();
    try {
      JsonNode json = request().body().asJson();
      DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
      Date date = df.parse(json.findPath("date").asText());
      String time = json.findPath("strtTime").asText();
      long newtime = date.getTime();
      newtime +=( Integer.parseInt(time.split(":")[0]) *60*60*1000);
      newtime +=( Integer.parseInt(time.split(":")[1]) *60*1000);
      Date startTime = new Date(newtime);
      newtime = date.getTime();
      time = json.findPath("endTime").asText();
      newtime +=( Integer.parseInt(time.split(":")[0]) *60*60*1000);
      newtime +=( Integer.parseInt(time.split(":")[1]) *60*1000);
      Date endTime = new Date(newtime);
      long labId = json.findPath("labid").asLong();
      ArrayList<EquipmentUnit> equipmentUnits =ScheduleService.GetAvailableEquipmentUnits(jpaApi,startTime,endTime,labId);
      ArrayList<Equipment> equipments = new ArrayList<Equipment>();
      HashSet ids = new HashSet();
      for(int i =0 ; i<equipmentUnits.size(); i++)
      {
          if(!ids.contains(equipmentUnits.get(i).equipment.id))
          {
              equipments.add(equipmentUnits.get(i).equipment);
              ids.add(equipmentUnits.get(i).equipment.id);
          }
      }
      hash.put("units",equipmentUnits);
      hash.put("equipments",equipments);
      return ok(Json.toJson(hash));

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
  public Result MakeReservation() {
    logger.debug("Adding Labs");
    ResponseCore oResponse = new ResponseCore();
    HashMap<String, Object> hash = new HashMap();
    try {
      JsonNode json = request().body().asJson();
      DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
      long unitId= json.findPath("unitId").asLong();
      Date date = df.parse(json.findPath("date").asText());
      String time = json.findPath("strtTime").asText();
      long newtime = date.getTime();
      newtime +=( Integer.parseInt(time.split(":")[0]) *60*60*1000);
      newtime +=( Integer.parseInt(time.split(":")[1]) *60*1000);
      Date startTime = new Date(newtime);
      newtime = date.getTime();
      time = json.findPath("endTime").asText();
      newtime +=( Integer.parseInt(time.split(":")[0]) *60*60*1000);
      newtime +=( Integer.parseInt(time.split(":")[1]) *60*1000);
      Date endTime = new Date(newtime);
      boolean isRef = json.findPath("isRef").asBoolean();
      long labId = json.findPath("refLab").asLong();
      String userId = json.findPath("userId").asText();
      oResponse.status = ScheduleService.CreateBooking(jpaApi,startTime,endTime,unitId,isRef,labId,userId);
      oResponse.message = oResponse.status;
      oResponse.response = null;
      return ok(Json.toJson(oResponse));

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
  public Result GetSchedule() {
    ResponseCore oResponse = new ResponseCore();
    HashMap<String, Object> hash = new HashMap();
    try {
      JsonNode json = request().body().asJson();
      String type = json.findPath("type").asText();
      long id = json.findPath("id").asLong();
      String userId = json.findPath("userId").asText();
      hash.put("schedule",ScheduleService.GetSchedule(jpaApi,type,id));
      return ok(Json.toJson(hash));

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
