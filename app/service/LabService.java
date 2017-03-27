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
import utils.Constants;
import utils.Hash;

import javax.inject.Inject;
import java.util.Date;
import java.util.UUID;

/**
 * Created by aniketchitale7 on 3/27/17.
 */
public class LabService {

  public String addLabs(JPAApi jpaApi ,JsonNode json , String managerEmail){
    Lab lab = new Lab();
    UserLabRole userLabRole =  new UserLabRole();
//    lab.labName = json.findPath("lab_name").textValue();
//    lab.labPi = json.findPath("lab_pi").textValue();
    lab.labName = "Dexter Labs";
    lab.labPi = "Maddy";
    lab = LabCore.insert(jpaApi, lab);
    if(lab==null)
      return Constants.LAB_EXISTS;
    User user = UserCore.findByEmail(jpaApi , managerEmail);
    if(user == null) return Constants.USER_NOT_FOUND;

    userLabRole.labId = lab;
    userLabRole.roleId = RoleCore.GetRole(jpaApi, 1);
    userLabRole.userId = user;
    userLabRole =  LabCore.insertRoleMapper(jpaApi, userLabRole);
    return Constants.REGISTRATION_SUCCESS;
  }
}
