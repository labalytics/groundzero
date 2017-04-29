package core;

import models.Equipment;
import models.EquipmentUnit;
import models.Schedule;
import play.Logger;
import play.db.jpa.JPAApi;
import utils.Constants;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Date;

public class ScheduleCore {

  public static ArrayList<EquipmentUnit> GetAvailableEquipemnts(JPAApi jpaApi, Date strt, Date end, long labId) {

    ArrayList<EquipmentUnit> equipmentUnits = new ArrayList<>();
    Query q = jpaApi.em().createQuery("SELECT e FROM EquipmentUnit e where e.equipment.lab.id = :labid and e.id not in ( SELECT s.equipmentUnitId.id FROM Schedule s where s.startTime between :strtTime and :endTime and s.endTime between  :strtTime and :endTime)");
    q.setParameter("labid", labId );
    q.setParameter("strtTime", strt);
    q.setParameter("endTime", end);
    try {
      equipmentUnits = (ArrayList<EquipmentUnit>) q.getResultList();
      return  equipmentUnits;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return equipmentUnits;
    }

  }

  public static String CreateBooking(JPAApi jpaApi, Schedule schedule) {

    try {
      jpaApi.em().persist(schedule);
      return Constants.RESPONSE_SUCCESS;
      //Send email to user asking for confirmation of account
    } catch (Exception e) {
      return Constants.RESPONSE_FAILURE;
    }

  }


}

