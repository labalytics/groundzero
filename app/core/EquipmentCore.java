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

  public static ArrayList<EquipmentUnit> GetEquipemnts(JPAApi jpaApi, ArrayList labIds) {

    ArrayList<EquipmentUnit> equipmentUnits = new ArrayList<>();
    Query q = jpaApi.em().createQuery("SELECT e FROM EquipmentUnit e WHERE e.equipment.lab.id in (:email)");
    q.setParameter("email", labIds );
    try {
      equipmentUnits = (ArrayList<EquipmentUnit>) q.getResultList();
      return  equipmentUnits;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return equipmentUnits;
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



}

