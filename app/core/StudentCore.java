package core;

import models.Role;
import models.RoleAccess;
import models.User;
import models.UserLabRole;
import play.db.jpa.JPAApi;

import javax.persistence.Query;
import java.util.ArrayList;

public  class StudentCore {

  public static ArrayList<UserLabRole> GetStudents(JPAApi jpaApi, long lab_id) {

    Query q = jpaApi.em().createQuery("SELECT u FROM UserLabRole u WHERE u.labId.id = :id");
    q.setParameter("id", lab_id);
    try {
      ArrayList<UserLabRole> userLabRoles = (ArrayList<UserLabRole>) q.getResultList();
      return userLabRoles;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return null;
    }

  }

}

