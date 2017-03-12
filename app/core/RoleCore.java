package core;

import models.Role;
import models.RoleAccess;
import play.db.jpa.JPAApi;

import javax.persistence.Query;
import java.util.ArrayList;

public  class RoleCore {

  public static Role GetRole(JPAApi jpaApi, long role_id) {

    Query q = jpaApi.em().createQuery("SELECT r FROM Role r WHERE r.id = :id");
    q.setParameter("id", role_id);
    try {
      Role role = (Role) q.getSingleResult();
      return role;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return null;
    }

  }

  public static ArrayList<RoleAccess> GetMenu(JPAApi jpaApi, long role_id) {

    Query q = jpaApi.em().createQuery("SELECT r FROM RoleAccess r WHERE r.role.id = :id");
    q.setParameter("id", role_id);
    try {
      ArrayList<RoleAccess> res = new ArrayList<RoleAccess>();
      res = (ArrayList<RoleAccess>) q.getResultList();
      return res;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return null;
    }

  }
}

