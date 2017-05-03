package service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import core.*;
import models.*;
import org.apache.commons.mail.EmailException;
import play.db.jpa.JPA;
import play.db.jpa.JPAApi;
import play.libs.mailer.MailerClient;
import utils.Constants;
import utils.Hash;
import utils.Mailer;
import utils.UtilCommons;

import java.net.MalformedURLException;
import java.time.Period;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;

/**
 * Created by skalyanmoguloju on 3/27/17.
 */
public class ScheduleService {

  public static ArrayList<EquipmentUnit> GetAvailableEquipmentUnits(JPAApi jpaApi , Date strt, Date end, long labId){
    return ScheduleCore.GetAvailableEquipemnts(jpaApi, strt, end, labId);
  }


  public static ArrayList<Schedule> GetSelfSchedule(JPAApi jpaApi , String username){
    return GetSchedule(jpaApi ,"student",UserCore.findByEmail(jpaApi,username).id);
  }

  public static ArrayList<Schedule> GetSchedule(JPAApi jpaApi , String type,  long Id){
    ArrayList<Schedule> res = new ArrayList<>();
    if(type.equals("unit"))
    {
      res = ScheduleCore.GetScheduleByEquipment(jpaApi,Id);
    }
    else if(type.equals("student"))
    {
      res = ScheduleCore.GetScheduleByUser(jpaApi,Id);
    }
    else if(type.equals("lab"))
    {
      res = ScheduleCore.GetScheduleByLab(jpaApi,Id);
    }
    return res;
  }

  public static String CreateBooking(JPAApi jpaApi, Date strt, Date end, long unitId, boolean isRef, long refLabId, String userId)
  {
    EquipmentUnit equipmentUnit = EquipmentCore.getEquipmentUnitById(jpaApi, unitId);
    User user;

    Schedule schedule= new Schedule();
    schedule.endTime = end;
    schedule.startTime = strt;
    schedule.equipmentUnitId = equipmentUnit;
    schedule.nonworkingRate = equipmentUnit.equipment.nonworkingRate;
    schedule.status = "Active";
    schedule.userId = UserCore.findByEmail(jpaApi,userId);
    if(isRef) {
      schedule.userLabId = LabCore.getLabById(jpaApi, refLabId);
    }
    else{
      schedule.userLabId = LabCore.getLabById(jpaApi, equipmentUnit.equipment.lab.id);
    }
    schedule.workingRate = equipmentUnit.equipment.workingRate;
    if(schedule!=null)
    {
      long diff = end.getTime() - strt.getTime();
      long diffMinutes = diff / (60 * 1000);
      int diffHours = (int)(diff / (60 * 60 * 1000));
      if(diffMinutes>0 && diffMinutes<59)
          diffHours++;
      equipmentUnit.available_count = equipmentUnit.available_count-diffHours;
      EquipmentCore.UpdateUsageValue(jpaApi, equipmentUnit);
    }
    return ScheduleCore.CreateBooking(jpaApi,schedule);
  }

  public static ArrayList<Schedule> getBookingsForLabs(JPAApi jpaApi , String email){
    return ScheduleCore.getBookingForLabs(jpaApi,email);
  }

  public static ArrayList<Schedule> getBookingToPayByLabs(JPAApi jpaApi , String email){
    return ScheduleCore.getBookingToPayByLabs(jpaApi,email);
  }

  public static ArrayList<Schedule> getBookingOwedByLabs(JPAApi jpaApi , String email){
    return ScheduleCore.getBookingOwedByLabs(jpaApi,email);
  }

  public static String makePayments(JPAApi jpaApi, ArrayNode arrayNode, MailerClient mailerClient){
    try {
      ScheduleCore.makePayments(jpaApi,arrayNode);
      return Constants.RESPONSE_SUCCESS;
    } catch (Exception e) {
      return Constants.RESPONSE_EXCEPTION;
    }
  }

}

