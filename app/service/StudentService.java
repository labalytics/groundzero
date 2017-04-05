package service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import core.LabCore;
import core.RoleCore;
import core.UserCore;
import models.Lab;
import models.User;
import models.UserLabRole;
import org.apache.commons.mail.EmailException;
import play.db.jpa.JPAApi;
import play.libs.mailer.MailerClient;
import utils.Constants;
import utils.Hash;
import utils.Mailer;
import utils.UtilCommons;

import java.net.MalformedURLException;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

/**
 * Created by aniketchitale7 on 3/27/17.
 */
public class StudentService {
  public static String addStudents(JPAApi jpaApi ,ArrayNode arrayNode , MailerClient mailerClient){
    try {
      Mailer mail = new Mailer(mailerClient);
      for (final JsonNode objNode : arrayNode) {
        User user = UserCore.findByEmail(jpaApi , objNode.findPath("email").textValue());
        if(user == null) {
          user = new User();
          user.firstName = objNode.findPath("firstName").textValue();
          user.lastName =objNode.findPath("lastName").textValue();
          user.email = objNode.findPath("email").textValue();
          user.dateCreation = new Date();
          user.validated = false;
          user.status = "Pending";
          // Generate a random password
          String password = UtilCommons.generatePassword();
          //Hash the randomly generated password
          user.passwordHash = Hash.createPassword(password);
          user.confirmationToken = UUID.randomUUID().toString();
          user = UserCore.doRegister(jpaApi, user);
          //send email for New Manager Registration
          try {
            mail.sendEmailForNewPassword(user.email , password);
          } catch (EmailException e) {
            e.printStackTrace();
          } catch (MalformedURLException e) {
            e.printStackTrace();
          }
        }
        if(user == null) return Constants.STUDENT_FAILURE;

        UserLabRole userLabRole =new UserLabRole();
        userLabRole.labId = LabCore.getLabById(jpaApi, objNode.findPath("labid").asLong());
        userLabRole.roleId = RoleCore.GetRole(jpaApi, 2);
        userLabRole.userId = user;
        userLabRole =  LabCore.insertRoleMapper(jpaApi, userLabRole);

        if(userLabRole == null) return Constants.STUDENT_FAILURE;
        //send Email for new Lab registration under existing manager.
        try {
          mail.sendEmailForNewLab(userLabRole.labId.labName , user.email);
        } catch (EmailException e) {
          e.printStackTrace();
        } catch (MalformedURLException e) {
          e.printStackTrace();
        }
      }
      return Constants.REGISTRATION_SUCCESS;
    } catch (Exception e) {
      return Constants.STUDENT_FAILURE;
    }
  }
}
