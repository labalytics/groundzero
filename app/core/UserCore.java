package core;

/**
 * Created by sai on 2/23/17.
 */

import models.User;
import play.db.jpa.JPA;
import play.db.jpa.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import java.util.List;

public class UserCore {

  public List<User> selectAllFriends() {
    EntityManager em = JPA.em("default");
    List<User> result = em.createQuery("SELECT u FROM User u").getResultList();
    em.close();
    return result;
  }

  public void InsertUser(User user)
  {
      JPA.em().persist(user);

  }
}
