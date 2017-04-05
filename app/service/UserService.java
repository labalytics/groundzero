package service;

import com.fasterxml.jackson.databind.JsonNode;
import core.LabCore;
import core.RoleCore;
import core.UserCore;
import models.Lab;
import models.Role;
import models.User;
import models.UserLabRole;
import org.apache.commons.mail.EmailException;
import play.data.FormFactory;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import play.i18n.Messages;
import play.libs.mailer.MailerClient;
import utils.Constants;
import utils.Hash;
import utils.Mailer;
import utils.UtilCommons;

import javax.inject.Inject;
import java.net.MalformedURLException;
import java.util.Date;
import java.util.UUID;

/**
 * Created by sai on 3/10/17.
 */
public class UserService {

  public String registerUser(JPAApi jpaApi ,JsonNode json, MailerClient mailerClient ){

    User user = new User();
    Lab lab = new Lab();
    UserLabRole userLabRole =  new UserLabRole();

    user.firstName = json.findPath("first_name").textValue();
    user.lastName =json.findPath("last_name").textValue();
    user.email = json.findPath("email").textValue();
    user.dateCreation = new Date();
    user.validated = false;
    user.status = "Active";

    try {
      user.passwordHash = Hash.createPassword(json.findPath("password").textValue());
    }
    catch(Exception e) {
      user.passwordHash ="";
    }
    user.confirmationToken = UUID.randomUUID().toString();
    user = UserCore.doRegister(jpaApi, user);

    if(user==null) return Constants.REGISTRATION_USER_EXISTS;
    lab.labName = json.findPath("lname").textValue();
    lab.labPi = json.findPath("piname").textValue();
    lab = LabCore.insert(jpaApi, lab);

    UserLabRole userLabRole1 = new UserLabRole();
    userLabRole.labId = lab;
    userLabRole.roleId = RoleCore.GetRole(jpaApi, 1);
    userLabRole.userId = user;
    userLabRole =  LabCore.insertRoleMapper(jpaApi, userLabRole);
    //send email
    Mailer mail = new Mailer(mailerClient);
    try {
      mail.sendMailAskForConfirmation(user);
    } catch (EmailException e) {
      e.printStackTrace();
      //return Constants.RESPONSE_EXCEPTION;
    } catch (MalformedURLException e) {
      e.printStackTrace();
      //return Constants.RESPONSE_EXCEPTION;

    }
    return Constants.REGISTRATION_SUCCESS;
  }

  public String forgotPassword(JPAApi jpaApi, String email)
  {
    try {
      User user = UserCore.findByEmail(jpaApi, email);
      if (user != null) {
        user.passwordHash = Hash.createPassword(UtilCommons.generatePassword());
        user.status = "Pending";
        //email logic
        UserCore.updateUser(jpaApi,user);
        return Constants.SUCCESS;
      } else {
        return Constants.USER_NOT_FOUND;
      }
    }
    catch (Exception e) {
      return Constants.RESPONSE_FAILURE;
    }
  }

}
