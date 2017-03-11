package core;

import models.Lab;
import models.UserLabRole;
import play.Logger;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;

public class LabCore {



  public static Lab insert(JPAApi jpaApi, Lab lab) {

      try {
        jpaApi.em().persist(lab);
        return lab;
        //Send email to user asking for confirmation of account
      } catch (Exception e) {
        Logger.error("Signup.save error", e);
      }
      return null;

  }

  public static UserLabRole insertRoleMapper(JPAApi jpaApi, UserLabRole userLabRole) {

    try {
      jpaApi.em().persist(userLabRole);
      return userLabRole;
      //Send email to user asking for confirmation of account
    } catch (Exception e) {
      Logger.error("Signup.save error", e);
    }
    return null;

  }

}

