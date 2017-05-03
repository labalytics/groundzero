package core;

import com.fasterxml.jackson.databind.JsonNode;
import models.*;
import play.Logger;
import play.db.jpa.JPAApi;
import service.EquipmentService;
import utils.Constants;
import utils.Hash;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

public class EquipmentCore {

  public static ArrayList<Equipment> GetEquipemnts(JPAApi jpaApi, ArrayList labIds) {

    ArrayList<Equipment> equipment = new ArrayList<>();
    Query q = jpaApi.em().createQuery("SELECT e FROM Equipment e WHERE e.lab.id in (:labs)");
    q.setParameter("labs", labIds );
    try {
      equipment = (ArrayList<Equipment>) q.getResultList();
      return  equipment;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return equipment;
    }

  }
  public static ArrayList<EquipmentUnit> GetEquipemntsUnits(JPAApi jpaApi, ArrayList labIds) {

    ArrayList<EquipmentUnit> equipment = new ArrayList<>();
    Query q = jpaApi.em().createQuery("SELECT e FROM EquipmentUnit e WHERE e.equipment.lab.id in (:labs)");
    q.setParameter("labs", labIds );
    try {
      equipment = (ArrayList<EquipmentUnit>) q.getResultList();
      return  equipment;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return equipment;
    }

  }

  public static Equipment addEquipment(JPAApi jpaApi, Equipment equipment) {
    try {
      jpaApi.em().persist(equipment);
      return equipment;
    } catch (Exception e) {
      Logger.error("failed", e);
    }
    return null;

  }

  public static EquipmentUnit addEquipmentUnit(JPAApi jpaApi, EquipmentUnit equipmentUnit) {
    try {
      jpaApi.em().persist(equipmentUnit);
      return equipmentUnit;
    } catch (Exception e) {
      Logger.error("failed", e);
    }
    return null;

  }


  public static Equipment getEquipmentById(JPAApi jpaApi , long id) {
    Query q = jpaApi.em().createQuery("SELECT distinct(e) FROM Equipment e where e.id = :id");
    q.setParameter("id", id);
    try {
      Equipment equipment = (Equipment) q.getSingleResult();
      return equipment;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return null;
    }
  }

  public static EquipmentUnit getEquipmentUnitById(JPAApi jpaApi , long unitId) {
    Query q = jpaApi.em().createQuery("SELECT distinct(u) FROM EquipmentUnit u where u.id = :unitId");
    q.setParameter("unitId", unitId);
    try {
      EquipmentUnit equipmentUnit = (EquipmentUnit) q.getSingleResult();
      return equipmentUnit;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return null;
    }
  }

  public static boolean UpdateUsageValue(JPAApi jpaApi, EquipmentUnit equipmentUnit)
  {
    jpaApi.em().persist(equipmentUnit);
    return true;
  }


  public static ArrayList<EquipmentUnit> GetNotifications(JPAApi jpaApi, String username)
  {
    ArrayList<EquipmentUnit> equipment = new ArrayList<>();
    Query q = jpaApi.em().createQuery("SELECT e FROM EquipmentUnit e WHERE e.equipment.lab.id in (SELECT u.labId.id from UserLabRole u WHERE u.userId.email= :username and u.roleId.id=1) and (100-(e.available_count/e.units_count)*100) >= e.equipment.usageNotification");
    q.setParameter("username", username );
    try {
      equipment = (ArrayList<EquipmentUnit>) q.getResultList();
      return  equipment;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return equipment;
    }
  }


}

