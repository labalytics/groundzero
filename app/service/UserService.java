package service;

import com.fasterxml.jackson.databind.JsonNode;
import core.LabCore;
import core.RoleCore;
import core.UserCore;
import models.Lab;
import models.Role;
import models.User;
import models.UserLabRole;
import play.data.FormFactory;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import play.libs.mailer.MailerClient;
import utils.Hash;

import javax.inject.Inject;
import java.util.Date;
import java.util.UUID;

/**
 * Created by sai on 3/10/17.
 */
public class UserService {




  public User registerUser(JPAApi jpaApi ,JsonNode json ){

    User user = new User();
    Lab lab = new Lab();
    UserLabRole userLabRole =  new UserLabRole();

    user.firstName = json.findPath("first_name").textValue();
    user.lastName =json.findPath("last_name").textValue();
    user.email = json.findPath("email").textValue();
    user.dateCreation = new Date();
    user.validated = false;
    try {
      user.passwordHash = Hash.createPassword(json.findPath("password").textValue());

    }
    catch(Exception e)
    {
      user.passwordHash ="";
    }
    user.confirmationToken = UUID.randomUUID().toString();
    user = UserCore.doRegister(jpaApi, user);

    if(user != null) {
      lab.labName = json.findPath("lname").textValue();
      lab.labPi = json.findPath("piname").textValue();
      lab = LabCore.insert(jpaApi, lab);

      UserLabRole userLabRole1 = new UserLabRole();
      userLabRole.labId = lab;
      userLabRole.roleId = RoleCore.GetRole(jpaApi, 1);
      userLabRole.userId = user;
      userLabRole = LabCore.insertRoleMapper(jpaApi, userLabRole);
    }

    return user;
  }





}
