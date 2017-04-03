package controllers.account;

import com.fasterxml.jackson.databind.JsonNode;
import core.RoleCore;
import core.UserCore;
import models.RoleAccess;
import models.User;
import models.UserLabRole;
import org.apache.commons.mail.EmailException;
import play.Configuration;
import play.Logger;
import play.data.Form;
import play.data.FormFactory;
import play.data.validation.Constraints;
import play.db.jpa.JPA;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import play.i18n.Messages;
import play.libs.Json;
import play.libs.mailer.MailerClient;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;

import javax.inject.Inject;
import javax.persistence.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.*;
import java.util.List;

import service.UserService;
import utils.Constants;
import utils.Mail;

import core.ResponseCore;

import static play.libs.Json.newObject;
import static play.libs.Json.toJson;

public class Authorize extends Controller {

  private final FormFactory formFactory;
  private final JPAApi jpaApi;
  private final MailerClient mailerClient;
  final Logger.ALogger logger = Logger.of(this.getClass());

  @Inject
  public Authorize(FormFactory formFactory, JPAApi jpaApi, MailerClient mailerClient) {
    this.formFactory = formFactory;
    this.jpaApi = jpaApi;
    this.mailerClient = mailerClient;
  }

  public static class Login {
    @Constraints.Required
    public String email;
    @Constraints.Required
    public String password;

    public String validate() {
      User user = new User();
//      user = User.authenticate(email, password);
//      if (user == null) {
//        return "Invalid user or password";
//      } else if(!user.validated) {
//        return "Account is not yet confirmed!";
//      }
      return null;
    }
  }

  public Result GetAuthorizeView() {
    return ok(views.html.authorize.authorize.render("A"));
  }

  @Transactional(readOnly = true)
  public Result validateUser() {
    logger.debug("Trying to Login");
    JsonNode json = request().body().asJson();
    ResponseCore oResponse = new ResponseCore();
    User user = new User();

    String email = json.findPath("email").textValue();
    HashMap<String, Object> hash = new HashMap();
    String sStatus = UserCore.authenticate(jpaApi, email, json.findPath("password").textValue());
    if (sStatus.equals(Constants.SUCCESS)) {

      oResponse.status = Constants.RESPONSE_SUCCESS;
      oResponse.message = sStatus;
      hash.put("email", email);
      oResponse.response = hash;
    } else {
      oResponse.status = Constants.RESPONSE_FAILURE;
      oResponse.message = sStatus;
    }
    return ok(Json.toJson(oResponse));
  }

  @Transactional(readOnly = true)
  public ArrayList<UserLabRole> getRoleAccess(String email) {
    User user = new User();
    ArrayList<UserLabRole> userLabRole = UserCore.getUserLabRole(jpaApi, email);
    return userLabRole;
  }

  @Transactional(readOnly = true)
  public ArrayList<RoleAccess> getMenuItems(UserLabRole userLabRole) {
    ArrayList<RoleAccess> roleAccessList = RoleCore.GetMenu(jpaApi, userLabRole.roleId.id);
    return roleAccessList;
  }

  @Transactional(readOnly = true)
  public Result getRoleAndMenuItems() {
    logger.debug("Get Role Access");
    JsonNode json = request().body().asJson();
    String email = json.findPath("email").textValue();
    HashMap<String, Object> hash = new HashMap();
    ArrayList<UserLabRole> userLabRole = getRoleAccess(email);
    hash.put("userDetails", userLabRole);
    if (userLabRole != null) {
      UserLabRole role = userLabRole.get(0);
      ArrayList<RoleAccess> roleAccessList = getMenuItems(role);
      hash.put("navItems", roleAccessList);
    }
    ResponseCore oResponse = new ResponseCore();
    oResponse.status = Constants.RESPONSE_SUCCESS;
    oResponse.message = "Role Retrieved Successfully";
    oResponse.response = hash;
    return ok(Json.toJson(oResponse));
  }


  @Transactional
  public Result registration() {
    logger.debug("Trying to Regester");
    ResponseCore oResponse = new ResponseCore();
    HashMap<String, Object> hash = new HashMap();
    try {
      JsonNode json = request().body().asJson();
      UserService userService = new UserService();

      String sStatus = userService.registerUser(jpaApi, json);
      hash.put("registration", sStatus);

      oResponse.status = Constants.RESPONSE_SUCCESS;
      oResponse.message = "Role Retrieved Successfully";
      oResponse.response = hash;
    } catch (Exception e) {
      logger.error("Authorize.save error", e);
      flash("error", Messages.get("error.technical"));
      oResponse.status = Constants.RESPONSE_EXCEPTION;
      oResponse.message = Constants.REGISTRATION_FAILURE;
      oResponse.response = null;
    }
    return ok(Json.toJson(oResponse));
  }

  /**
   * Send the welcome Email with the link to confirm.
   *
   * @param user user created
   * @throws EmailException Exception when sending mail
   */
  private void sendMailAskForConfirmation(User user) throws EmailException, MalformedURLException {
    String subject = Messages.get("mail.confirm.subject");
    String urlString = "http://" + Configuration.root().getString("server.hostname");
    urlString += "/confirm/" + user.confirmationToken;
    URL url = new URL(urlString); // validate the URL, will throw an exception if bad.

    String message = Messages.get("mail.confirm.message", url.toString());

    Mail.Envelop envelop = new Mail.Envelop(subject, message, user.email);
    Mail mailer = new Mail(mailerClient);
    mailer.sendMail(envelop);
  }

  /**
   * Validate an account with the url in the confirm mail.
   *
   * @param token a token attached to the user we're confirming.
   * @return Confirmationpage
   */
  @Transactional
  public Result confirm(String confirmToken) {
    User user = User.findByConfirmationToken(confirmToken);
    if (user == null) {
      flash("error", Messages.get("error.unknown.email"));
//      return badRequest(views.html.confirm.render());
    }
    if (user.validated) {
      flash("error", Messages.get("error.account.already.validated"));
      // return badRequest(views.html.confirm.render());
    }
    try {
      if (User.confirm(user)) {
        sendMailConfirmation(user);
        flash("success", Messages.get("account.successfully.validated"));
        // return ok(views.html.confirm.render());
      } else {
        logger.debug("Login.confirm cannot confirm user");
        flash("error", Messages.get("error.confirm"));
        //return badRequest(views.html.confirm.render());
      }
    } catch (EmailException e) {
      logger.debug("Cannot send email", e);
      flash("error", Messages.get("error.sending.confirm.email"));
    } catch (Exception e) {
      logger.error("Cannot signup", e);
      flash("error", Messages.get("error.technical"));
    }
    return badRequest(views.html.home.home.render());
  }

  /**
   * Send the confirm mail.
   *
   * @param user user created
   * @throws EmailException Exception when sending mail
   */
  private void sendMailConfirmation(User user) throws EmailException {
    String subject = Messages.get("mail.welcome.subject");
    String message = Messages.get("mail.welcome.message");
    Mail.Envelop envelop = new Mail.Envelop(subject, message, user.email);
    Mail mailer = new Mail(mailerClient);
    mailer.sendMail(envelop);
  }

  public Result register() {
    return ok(views.html.authorize.authorize.render("B"));
  }

}

