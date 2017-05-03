package controllers.account;

/**
 * Created by aniketchitale7 on 3/27/17.
 */

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import core.ResponseCore;
import models.Equipment;
import models.EquipmentUnit;
import models.Schedule;
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
import java.text.SimpleDateFormat;
import java.util.*;

public class ReportController extends Controller {

  private final FormFactory formFactory;
  private final JPAApi jpaApi;
  private final MailerClient mailerClient;
  final Logger.ALogger logger = Logger.of(this.getClass());

  @Inject
  public ReportController(FormFactory formFactory, JPAApi jpaApi, MailerClient mailerClient) {
    this.formFactory = formFactory;
    this.jpaApi = jpaApi;
    this.mailerClient = mailerClient;
  }

  @Transactional
  public Result getBookingForLabs() {
    logger.debug("Getting Booking Details");
    ResponseCore oResponse = new ResponseCore();
    HashMap<String, Object> hash = new HashMap();
    try {
      JsonNode json = request().body().asJson();
      String email = json.findPath("email").asText();
      ArrayList<Schedule> bookingList = ScheduleService.getBookingsForLabs(jpaApi,email);
      hash.put("bookingList",bookingList);
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
  public Result getBookingToPayByLabs() {
    logger.debug("Getting Booking to pay by Labs");
    ResponseCore oResponse = new ResponseCore();
    HashMap<String, Object> hash = new HashMap();
    try {
      JsonNode json = request().body().asJson();
      String email = json.findPath("email").asText();
      ArrayList<Schedule> bookingList = ScheduleService.getBookingToPayByLabs(jpaApi,email);
      hash.put("bookingList",bookingList);
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
  public Result getBookingOwedByLabs() {
    logger.debug("Getting Booking to Owed by Labs");
    ResponseCore oResponse = new ResponseCore();
    HashMap<String, Object> hash = new HashMap();
    try {
      JsonNode json = request().body().asJson();
      String email = json.findPath("email").asText();
      ArrayList<Schedule> bookingList = ScheduleService.getBookingOwedByLabs(jpaApi,email);
      hash.put("bookingList",bookingList);
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
  public Result makePaymentForLab() {
    logger.debug("Adding Labs");
    ResponseCore oResponse = new ResponseCore();
    HashMap<String, Object> hash = new HashMap();
    try {
      JsonNode json = request().body().asJson();
      Iterator<JsonNode> iterator = json.elements();
      ArrayNode arrayNode = (ArrayNode) json.findPath("bookingIdList");
      String result = ScheduleService.makePayments(jpaApi, arrayNode , mailerClient);
      if(result.equalsIgnoreCase(Constants.RESPONSE_SUCCESS))
      {
        oResponse.status = Constants.RESPONSE_SUCCESS;
        oResponse.message = "Payment made Successfully";
        oResponse.response = hash;
      }
      else
      {
        oResponse.status = Constants.RESPONSE_FAILURE;
        oResponse.message = result;
        oResponse.response = hash;
      }


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
