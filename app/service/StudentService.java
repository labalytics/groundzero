package service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import core.LabCore;
import core.RoleCore;
import core.UserCore;
import models.Lab;
import models.User;
import models.UserLabRole;
import play.db.jpa.JPAApi;
import utils.Constants;
import utils.Hash;

import java.util.Date;
import java.util.Random;
import java.util.UUID;

/**
 * Created by aniketchitale7 on 3/27/17.
 */
public class StudentService {
  public static String addStudents(JPAApi jpaApi ,ArrayNode arrayNode){
    for (final JsonNode objNode : arrayNode) {
      User user = UserCore.findByEmail(jpaApi , objNode.findPath("email").textValue());
      if(user == null) {
        user = new User();
        user.firstName = objNode.findPath("firstName").textValue();
        user.lastName =objNode.findPath("lastName").textValue();
        user.email = objNode.findPath("email").textValue();
        user.dateCreation = new Date();
        user.validated = false;
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
        } catch(Exception e) {
          return Constants.STUDENT_FAILURE;
        }
        user.confirmationToken = UUID.randomUUID().toString();
        user = UserCore.doRegister(jpaApi, user);
      }

      if(user == null) return Constants.STUDENT_FAILURE;

      UserLabRole userLabRole =new UserLabRole();
      userLabRole.labId = LabCore.getLabById(jpaApi, objNode.findPath("labid").asLong());
      userLabRole.roleId = RoleCore.GetRole(jpaApi, 2);
      userLabRole.userId = user;
      userLabRole =  LabCore.insertRoleMapper(jpaApi, userLabRole);

      if(userLabRole == null) return Constants.STUDENT_FAILURE;
    }
    return Constants.REGISTRATION_SUCCESS;
  }
}
