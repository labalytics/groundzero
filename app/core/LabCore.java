package core;

import com.fasterxml.jackson.databind.JsonNode;
import models.*;
import play.Logger;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import service.LabService;

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

  public static ArrayList<UserLabRole> GetAllLabsForManager(JPAApi jpaApi , String email)
  {

      Query q = jpaApi.em().createQuery("SELECT distinct(u) FROM UserLabRole u where u.roleId.roleName = 'Manager' AND u.userId.email = :email");
      q.setParameter("email", email);
      try {
          ArrayList<UserLabRole> res = new ArrayList<UserLabRole>();
          res = (ArrayList<UserLabRole>) q.getResultList();
          return res;
      } catch(Exception e){
          System.out.println("Exception e = " + e.getMessage());
          return null;
      }
  }

  public static ArrayList<UserLabRole> GetAllLabs(JPAApi jpaApi)
  {
    Query q = jpaApi.em().createQuery("SELECT distinct(u) FROM UserLabRole u where u.roleId.roleName = 'Manager'");
    try {
      ArrayList<UserLabRole> res = new ArrayList<UserLabRole>();
      res = (ArrayList<UserLabRole>) q.getResultList();
      return res;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return null;
    }
  }

  public static Lab getLabById(JPAApi jpaApi , long labId)
  {
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


}

