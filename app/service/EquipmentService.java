package service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import core.EquipmentCore;
import core.LabCore;
import core.RoleCore;
import core.UserCore;
import models.*;
import play.db.jpa.JPAApi;
import utils.Constants;
import utils.Hash;

import java.util.ArrayList;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

/**
 * Created by skalyanmoguloju on 3/27/17.
 */
public class EquipmentService {

  public static ArrayList<Equipment> GetEquipments(JPAApi jpaApi , ArrayNode arrayNode){
    ArrayList labIds = new ArrayList();
    for (final JsonNode objNode : arrayNode) {
      labIds.add(objNode.asLong());
    }
    return EquipmentCore.GetEquipemnts(jpaApi, labIds);
  }
  public static ArrayList<EquipmentUnit> GetEquipmentsUnits(JPAApi jpaApi , ArrayNode arrayNode){
    ArrayList labIds = new ArrayList();
    for (final JsonNode objNode : arrayNode) {
      labIds.add(objNode.asLong());
    }
    return EquipmentCore.GetEquipemntsUnits(jpaApi, labIds);
  }

  public static String AddEquipment(JPAApi jpaApi, JsonNode jsonNode) {
    Equipment equipment = new Equipment();
    equipment.equipmentName = jsonNode.findPath("equipment_name").textValue();
    equipment.description = jsonNode.findPath("descriptiom").textValue();
    if(jsonNode.findPath("equipment_type").asInt() == 0) {
      equipment.equipmentType = "Reusable";
    } else {
      equipment.equipmentType = "Non-Reusable";
    }
    equipment.lab = LabCore.getLabById(jpaApi, jsonNode.findPath("labid").asLong());
    equipment.nonworkingRate = jsonNode.findPath("nonworkingRate").asDouble();
    equipment.workingRate= jsonNode.findPath("workingRate").asDouble();
    equipment.usageNotification = jsonNode.findPath("usageNot").asInt();
    equipment.status = "Active";
    if(jsonNode.findPath("equipment_cat").asInt() == 0) {
      equipment.type = "Equipment";
    } else {
      equipment.type = "Accessory";
    }
    if(jsonNode.findPath("equipment_type").asInt() != 1) {
      equipment.parentEquipment = EquipmentCore.getEquipmentById(jpaApi,jsonNode.findPath("equipment_parName").asLong());
    }

    equipment =  EquipmentCore.addEquipment(jpaApi,equipment);
    if(equipment == null) {
      return Constants.EQUIPMENT_FAILURE;
    }
    if(jsonNode.findPath("equipment_type").asInt() == 1) {
      EquipmentUnit equipmentUnit = new EquipmentUnit();
      equipmentUnit.equipment = equipment;
      equipmentUnit.status= "Active";
      equipmentUnit.available_count = jsonNode.findPath("units").asInt();
      equipmentUnit.units_count = jsonNode.findPath("units").asInt();
      //add parent equipiment as dynamic
      if(EquipmentCore.addEquipmentUnit(jpaApi,equipmentUnit) == null) {
        return Constants.UNIT_FAILURE;
      }
    } else {
      for(int i = 0; i<jsonNode.findPath("units").asInt();i++) {
        EquipmentUnit equipmentUnit = new EquipmentUnit();
        equipmentUnit.equipment = equipment;
        equipmentUnit.status= "Active";
        equipmentUnit.available_count = jsonNode.findPath("hoursUse").asInt();
        equipmentUnit.units_count = jsonNode.findPath("hoursUse").asInt();
        if(EquipmentCore.addEquipmentUnit(jpaApi,equipmentUnit) == null){
          return Constants.UNIT_FAILURE;
        }
      }
    }
    return Constants.SUCCESS;
  }

  public static ArrayList<EquipmentUnit> GetNotifications(JPAApi jpaApi, String username)
  {
    return EquipmentCore.GetNotifications(jpaApi,username);
  }

  public static String UpdateEquipment(JPAApi jpaApi, long id, String name, String desc, double workingrate, double nonworkingrate)
  {
    Equipment equipment = EquipmentCore.getEquipmentById(jpaApi, id);
    equipment.description= desc;
    equipment.equipmentName = name;
    equipment.workingRate = workingrate;
    equipment.nonworkingRate = nonworkingrate;
    EquipmentCore.addEquipment(jpaApi, equipment);
    return Constants.RESPONSE_SUCCESS;
  }

}

