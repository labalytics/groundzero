package core;

import models.Role;
import models.RoleAccess;
import models.User;
import models.UserLabRole;
import play.db.jpa.JPAApi;

import javax.persistence.Query;
import java.util.ArrayList;

public  class StudentCore {

  public static ArrayList<UserLabRole> GetStudents(JPAApi jpaApi,  ArrayList<Integer> lab_id) {
    ArrayList<UserLabRole> result = new ArrayList<>();
    for(int i = 0 ; i < lab_id.size() ; i++)
    {
      Query q = jpaApi.em().createQuery("SELECT u FROM UserLabRole u WHERE u.labId.id = :id");
      q.setParameter("id", (long)lab_id.get(i));
      try {
        ArrayList<UserLabRole> userLabRoles = (ArrayList<UserLabRole>) q.getResultList();
        result.addAll(userLabRoles);
      } catch(Exception e){
        System.out.println("Exception e = " + e.getMessage());
        return result;
      }
    }
    return result;
  }

  public static ArrayList<UserLabRole> GetAllStudents(JPAApi jpaApi) {
    ArrayList<UserLabRole> result = new ArrayList<>();
    Query q = jpaApi.em().createQuery("SELECT u FROM UserLabRole u where u.status = 'Active' and u.labId is not NULL");
    try {
        ArrayList<UserLabRole> userLabRoles = (ArrayList<UserLabRole>) q.getResultList();
        return userLabRoles;
    } catch(Exception e){
        System.out.println("Exception e = " + e.getMessage());
        return result;
    }
  }

}
