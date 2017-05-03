package core;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
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
    long diff = end.getTime() - strt.getTime();
    long diffMinutes = diff / (60 * 1000);
    int diffHours = (int)(diff / (60 * 60 * 1000));
    if(diffMinutes>0 && diffMinutes<60)
      diffHours++;
    ArrayList<EquipmentUnit> equipmentUnits = new ArrayList<>();
    Query q = jpaApi.em().createQuery("SELECT e FROM EquipmentUnit e where e.equipment.lab.id = :labid and e.available_count > :diffCount and e.id not in ( SELECT s.equipmentUnitId.id FROM Schedule s where s.startTime between :strtTime and :endTime or s.endTime between  :strtTime and :endTime)");
    q.setParameter("labid", labId );
    q.setParameter("strtTime", strt);
    q.setParameter("endTime", end);
    q.setParameter("diffCount", (long)diffHours);
    try {
      equipmentUnits = (ArrayList<EquipmentUnit>) q.getResultList();
      return  equipmentUnits;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return equipmentUnits;
    }

  }



  public static ArrayList<Schedule> getBookingForLabs(JPAApi jpaApi, String email) {

    ArrayList<Schedule> bookingList = new ArrayList<>();
    Query q = jpaApi.em().createQuery("SELECT e FROM Schedule e where e.equipmentUnitId.equipment.lab.id  in (SELECT distinct(u.labId) FROM UserLabRole u where u.userId.email = :email and u.status = 'Active' and u.labId is not NULL) and e.status = 'Active' or e.status = 'Paid'");

    q.setParameter("email", email );
    try {
      bookingList = (ArrayList<Schedule>) q.getResultList();
      return  bookingList;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return bookingList;
    }

  }

  public static ArrayList<Schedule> getBookingToPayByLabs(JPAApi jpaApi, String email) {
    ArrayList<Schedule> bookingList = new ArrayList<>();
    Query q = jpaApi.em().createQuery("SELECT e FROM Schedule e where e.equipmentUnitId.equipment.lab.id  not in (SELECT distinct(u.labId) FROM UserLabRole u where u.userId.email = :email and u.status = 'Active' and u.labId is not NULL) and e.userLabId.id in (SELECT distinct(u.labId) FROM UserLabRole u where u.userId.email = :email and u.status = 'Active' and u.labId is not NULL) and e.status = 'Active'");

    q.setParameter("email", email );
    try {
      bookingList = (ArrayList<Schedule>) q.getResultList();
      return  bookingList;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return bookingList;
    }

  }

  public static boolean makePayments(JPAApi jpaApi, ArrayNode arrayNode) {
    for (final JsonNode objNode : arrayNode)
    {
      System.out.println(objNode);
      long s = objNode.longValue();
      Query q = jpaApi.em().createQuery("UPDATE Schedule e SET e.status = 'Paid' WHERE e.id = :id");
      q.setParameter("id", objNode.longValue() );
      q.executeUpdate();
    }
    return true;

  }

  public static ArrayList<Schedule> getBookingOwedByLabs(JPAApi jpaApi, String email) {

    ArrayList<Schedule> bookingList = new ArrayList<>();
    Query q = jpaApi.em().createQuery("SELECT e FROM Schedule e where e.equipmentUnitId.equipment.lab.id  in (SELECT distinct(u.labId) FROM UserLabRole u where u.userId.email = :email and u.status = 'Active' and u.labId is not NULL) and e.userLabId.id not in (SELECT distinct(u.labId) FROM UserLabRole u where u.userId.email = :email and u.status = 'Active' and u.labId is not NULL) and e.status = 'Active'");

    q.setParameter("email", email );
    try {
      bookingList = (ArrayList<Schedule>) q.getResultList();
      return  bookingList;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return bookingList;
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

  public static ArrayList<Schedule> GetScheduleByEquipment(JPAApi jpaApi, long equipId)
  {
      ArrayList<Schedule> schedules = new ArrayList<>();
      Date dt = new Date();
      Query q = jpaApi.em().createQuery("SELECT s FROM Schedule s where s.equipmentUnitId.id = :unitid and s.endTime > :dt");
      q.setParameter("unitid", equipId );
      q.setParameter("dt", dt);
      try {
        schedules = (ArrayList<Schedule>) q.getResultList();
        return  schedules;
      } catch(Exception e){
        System.out.println("Exception e = " + e.getMessage());
        return schedules;
      }
  }

  public static ArrayList<Schedule> GetScheduleByUser(JPAApi jpaApi, long userId)
  {
    ArrayList<Schedule> schedules = new ArrayList<>();
    Date dt = new Date();
    Query q = jpaApi.em().createQuery("SELECT s FROM Schedule s where s.userId.id = :userid and s.endTime > :dt");
    q.setParameter("userid", userId );
    q.setParameter("dt", dt);
    try {
      schedules = (ArrayList<Schedule>) q.getResultList();
      return  schedules;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return schedules;
    }
  }

  public static ArrayList<Schedule> GetScheduleByLab(JPAApi jpaApi, long labId)
  {
    ArrayList<Schedule> schedules = new ArrayList<>();
    Date dt = new Date();
    Query q = jpaApi.em().createQuery("SELECT s FROM Schedule s where s.equipmentUnitId.equipment.lab.id = :labid and s.endTime > :dt");
    q.setParameter("labid", labId );
    q.setParameter("dt", dt);
    try {
      schedules = (ArrayList<Schedule>) q.getResultList();
      return  schedules;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return schedules;
    }
  }


}

