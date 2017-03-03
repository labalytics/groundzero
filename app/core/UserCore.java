package core;

import models.User;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import utils.Hash;

import javax.persistence.Query;

public class UserCore {

  public static User authenticate(JPAApi jpaApi, String email, String password) {
    Query q = jpaApi.em().createQuery("SELECT u FROM User u WHERE u.email = :email");
    q.setParameter("email", email);
    try {
      User user = (User) q.getSingleResult();
      if(user != null) {
        if (Hash.checkPassword(password, user.passwordHash)) {
          return user;
        }
      }
      return null;
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return null;
    }
  }

  /**
   * Find user by confirmationToken
   */
  public static User findByConfirmationToken(JPAApi jpaApi, String confirmationToken) {
    Query q = jpaApi.em().createQuery("SELECT u FROM User u WHERE u.confirmationToken = :confirmationToken");
    q.setParameter("confirmationToken", confirmationToken);
    try {
      User user = (User) q.getSingleResult();
      if (user != null) {
        return user;
      }
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return null;
    }
    return null;
  }

  /**
   * Find user by email
   */
  public static User findByEmail(JPAApi jpaApi, String email) {
    Query q = jpaApi.em().createQuery("SELECT u FROM User u WHERE u.email = :email");
    q.setParameter("email", email);
    try {
      User user = (User) q.getSingleResult();
      if (user != null) {
        return user;
      }
    } catch(Exception e){
      System.out.println("Exception e = " + e.getMessage());
      return null;
    }
    return null;
  }

  /**
   * Confirms an account.
   *
   * @return true if confirmed, false otherwise.
   * @throws Exception
   */
  public static boolean confirm(JPAApi jpaApi, User user) throws Exception {
    if (user == null) {
      return false;
    }

    user.confirmationToken = null;
    user.validated = true;
    jpaApi.em().persist(user);
    return true;
  }

}

