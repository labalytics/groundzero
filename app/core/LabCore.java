package core;

import com.fasterxml.jackson.databind.JsonNode;
import models.*;
import play.Logger;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import service.LabService;
import utils.Constants;

import javax.persistence.Query;
import java.util.ArrayList;

public class LabCore {

  public static Lab insert(JPAApi jpaApi, Lab lab) {
      try {
        jpaApi.em().persist(lab);
        return lab;
        //Send email to user asking for confirmation of account
      } catch (Exception e) {
        Logger.error("Authorize.save error", e);
      }
      return null;

  }

  public static UserLabRole insertRoleMapper(JPAApi jpaApi, UserLabRole userLabRole) {
    try {
      jpaApi.em().persist(userLabRole);
      return userLabRole;
      //Send email to user asking for confirmation of account
    } catch (Exception e) {
      Logger.error("Authorize.save error", e);
    }
    return null;

  }

  public static ArrayList<UserLabRole> GetAllLabs(JPAApi jpaApi , String email, long roleId) {
    Query q =  null;
    if(roleId == 3)
      q = jpaApi.em().createQuery("SELECT distinct(u) FROM UserLabRole u where u.status = 'Active' and u.labId is not NULL");
    else {
      q = jpaApi.em().createQuery("SELECT distinct(u) FROM UserLabRole u where u.userId.email = :email and u.status = 'Active' and u.labId is not NULL");
      q.setParameter("email", email);
    }
    try {
      ArrayList<UserLabRole> res = new ArrayList<UserLabRole>();
      res = (ArrayList<UserLabRole>) q.getResultList();
      return res;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return null;
    }
  }


  public static Lab getLabById(JPAApi jpaApi , long labId) {
    Query q = jpaApi.em().createQuery("SELECT distinct(u) FROM Lab u where u.id = :labId");
    q.setParameter("labId", labId);
    try {
      Lab lab = (Lab) q.getSingleResult();
      return lab;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return null;
    }
  }

  public static ArrayList<LabPermission> getReferedLabs(JPAApi jpaApi, ArrayList labdIds)
  {
    Query q = jpaApi.em().createQuery("SELECT distinct(l) FROM LabPermission l where l.status='Active' and l.requestedLab.id in :labId");
    q.setParameter("labId", labdIds);
    try {
      ArrayList<LabPermission> labs = (ArrayList<LabPermission>) q.getResultList();
      return labs;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return null;
    }
  }

  public static ArrayList<LabPermission> getReferedOutLabs(JPAApi jpaApi, ArrayList labdIds)
  {
    Query q = jpaApi.em().createQuery("SELECT distinct(l) FROM LabPermission l where l.status='Active' and l.currentLab.id in :labId");
    q.setParameter("labId", labdIds);
    try {
      ArrayList<LabPermission> labs = (ArrayList<LabPermission>) q.getResultList();
      return labs;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return null;
    }
  }

  public static ArrayList<Lab> getNotReferedLabs(JPAApi jpaApi, long labdId, ArrayList labdIds)
  {
    Query q = jpaApi.em().createQuery("SELECT distinct(l) FROM Lab l where l.id not in :labIds and l.id not in (SELECT distinct(lb.currentLab.id) from LabPermission lb where lb.requestedLab.id = :labId and lb.status!='Reject')" );
    q.setParameter("labIds", labdIds);
    q.setParameter("labId", labdId);
    try {
      ArrayList<Lab> labs = (ArrayList<Lab>) q.getResultList();
      return labs;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return null;
    }
  }

  public static LabPermission insertLabAccess(JPAApi jpaApi, LabPermission labPermission) {
    try {
      jpaApi.em().persist(labPermission);
      return labPermission;
      //Send email to user asking for confirmation of account
    } catch (Exception e) {
      Logger.error("Authorize.save error", e);
    }
    return null;
  }
  public static ArrayList<LabPermission> GetLabRequests(JPAApi jpaApi, String userName)
  {
    Query q = jpaApi.em().createQuery("SELECT p FROM LabPermission p where p.status = 'Pending' and  p.currentLab.id in (SELECT u.labId.id FROM UserLabRole u where u.userId.email = :uname and u.roleId.id = 1)" );
    q.setParameter("uname", userName);
    try {
      ArrayList<LabPermission> labPermissions = (ArrayList<LabPermission>) q.getResultList();
      return labPermissions;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return null;
    }
  }

  public static String AcceptLabRequest(JPAApi jpaApi, long id, String value)
  {
    Query q = jpaApi.em().createQuery("UPDATE LabPermission l SET l.status = :value WHERE l.id = :id" );
    q.setParameter("id", id);
    q.setParameter("value", value);
    try {
      q.executeUpdate();
      return Constants.RESPONSE_SUCCESS;
    } catch(Exception e){
      return Constants.RESPONSE_SUCCESS;
    }
  }

}

