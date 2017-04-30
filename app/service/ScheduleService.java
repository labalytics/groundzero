package service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import core.EquipmentCore;
import core.LabCore;
import core.ScheduleCore;
import core.UserCore;
import models.*;
import play.db.jpa.JPA;
import play.db.jpa.JPAApi;
import utils.Constants;

import java.util.ArrayList;
import java.util.Date;

/**
 * Created by skalyanmoguloju on 3/27/17.
 */
public class ScheduleService {

  public static ArrayList<EquipmentUnit> GetAvailableEquipmentUnits(JPAApi jpaApi , Date strt, Date end, long labId){
    return ScheduleCore.GetAvailableEquipemnts(jpaApi, strt, end, labId);
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
    return ScheduleCore.CreateBooking(jpaApi,schedule);
  }

  public static ArrayList<Schedule> getBookingsForLabs(JPAApi jpaApi , String email){
    return ScheduleCore.getBookingForLabs(jpaApi,email);
  }

}

