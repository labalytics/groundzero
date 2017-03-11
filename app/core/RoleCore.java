package core;

import models.Role;
import play.db.jpa.JPAApi;

import javax.persistence.Query;

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

}

