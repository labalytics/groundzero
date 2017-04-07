package service;
import com.fasterxml.jackson.databind.JsonNode;
import core.LabCore;
import core.RoleCore;
import core.UserCore;
import models.*;
import org.apache.commons.mail.EmailException;
import play.data.FormFactory;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import play.libs.mailer.MailerClient;
import utils.Constants;
import utils.Hash;
import utils.Mailer;

import javax.inject.Inject;
import java.net.MalformedURLException;
import java.util.Date;
import java.util.UUID;
import java.util.Random;
/**
 * Created by aniketchitale7 on 3/27/17.
 */
public class LabService {

  public String addLabs(JPAApi jpaApi ,JsonNode json , String managerEmail , MailerClient mailerClient){
    Lab lab = new Lab();
    UserLabRole userLabRole =  new UserLabRole();
//    lab.labName = json.findPath("lab_name").textValue();
//    lab.labPi = json.findPath("lab_pi").textValue();
    User user = UserCore.findByEmail(jpaApi , managerEmail);
    Mailer mail = new Mailer(mailerClient);
    if(user == null)
    {
      user = new User();
      user.firstName = json.findPath("manager_fname").textValue();
      user.lastName =json.findPath("manager_lname").textValue();
      user.email = json.findPath("email").textValue();
      user.dateCreation = new Date();
      user.validated = false;
      user.status = "Pending";
      char[] chars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
      StringBuilder sb = new StringBuilder();
      Random random = new Random();
      for (int i = 0; i < 10; i++) {
        char c = chars[random.nextInt(chars.length)];
        sb.append(c);
      }
      String output = sb.toString();
      try {
        user.passwordHash = Hash.createPassword(output);

      }
      catch(Exception e)
      {
        user.passwordHash ="";
      }
      user.confirmationToken = UUID.randomUUID().toString();
      user = UserCore.doRegister(jpaApi, user);
      //send email for New Manager Registration
      try {
        mail.sendEmailForNewPassword(user.email , output);
      } catch (EmailException e) {
        e.printStackTrace();
      } catch (MalformedURLException e) {
        e.printStackTrace();
      }


    }

    if(user == null) return Constants.REGISTRATION_FAILURE;

    lab.labName = json.findPath("lab_name").textValue();
    lab.labPi = json.findPath("pi_name").textValue();
    lab = LabCore.insert(jpaApi, lab);
    lab.status = "Active";
    if(lab==null)
      return Constants.LAB_EXISTS;

    userLabRole.labId = lab;
    userLabRole.roleId = RoleCore.GetRole(jpaApi, 1);
    userLabRole.userId = user;
    userLabRole.status = "Active";
    userLabRole =  LabCore.insertRoleMapper(jpaApi, userLabRole);
    //send Email for new Lab registration under existing manager.
    try {
      mail.sendEmailForNewLab(lab.labName , user.email);
    } catch (EmailException e) {
      e.printStackTrace();
    } catch (MalformedURLException e) {
      e.printStackTrace();
    }
    return Constants.REGISTRATION_SUCCESS;
  }

  public String createLabRequest(JPAApi jpaApi, long currentLabId, long requestedLabId)
  {
    LabPermission labPermission = new LabPermission();
    labPermission.currentLab = LabCore.getLabById(jpaApi, currentLabId);
    labPermission.requestedLab = LabCore.getLabById(jpaApi, requestedLabId);
    labPermission.status = "Pending";
    if(LabCore.insertLabAccess(jpaApi,labPermission) == null)
      return Constants.RESPONSE_FAILURE;
    return Constants.RESPONSE_SUCCESS;

  }
}
