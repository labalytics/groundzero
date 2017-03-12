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
  import java.util.HashSet;
  import java.util.List;

  import service.UserService;
  import utils.Mail;


  import static play.libs.Json.toJson;

public class Signup extends Controller {

  private final FormFactory formFactory;
  private final JPAApi jpaApi;
  private final MailerClient mailerClient;
  final Logger.ALogger logger = Logger.of(this.getClass());

  @Inject
  public Signup(FormFactory formFactory, JPAApi jpaApi , MailerClient mailerClient) {
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

  public Result login() {
    return ok(views.html.account.login.render("A"));
  }


  public Result signup() {
    return ok(views.html.account.signup.render());
  }

  @Transactional(readOnly = true)
  public Result validateUser(){
    logger.debug("Trying to Login");
    JsonNode json = request().body().asJson();
    User user = new User();

    UserCore userCore = new UserCore();
    UserLabRole userLabRole = userCore.authenticate(jpaApi, json.findPath("email").textValue(), json.findPath("password").textValue());
    HashSet hash = new HashSet();
    if (user != null) {
      //Login success
      logger.debug("Login successful");
      RoleCore roleCore = new RoleCore();
      ArrayList<RoleAccess> roleAccess = roleCore.GetMenu(jpaApi, userLabRole.roleId.id);
      hash.add(userLabRole);
      hash.add(roleAccess);
      return ok(Json.toJson(hash));
    } else {
      //Login failed
      //TODO
      logger.debug("Login failed");
      return ok(views.html.account.login.render("A"));
    }
  }

  @Transactional
  public Result registration(){
    logger.debug("Trying to Regester");
    try {
      JsonNode json = request().body().asJson();
      UserService userService = new UserService();
      User user = userService.registerUser(jpaApi, json);
      if (user != null) {
        //Login success
        logger.debug("Signup successful");
        sendMailAskForConfirmation(user);
        return ok(views.html.account.login.render("A"));
      } else {
        //Login failed
        //TODO
        logger.debug("Signup failed");
        return ok(views.html.account.login.render("A"));
      }
    }
    catch(EmailException e) {
      Logger.debug("Signup.save Cannot send email", e);
      flash("error", Messages.get("error.sending.email"));
    }
    catch(Exception e) {
      logger.error("Signup.save error", e);
      flash("error", Messages.get("error.technical"));
    }
      return ok(views.html.account.login.render("A"));
  }

  /**
   * Send the welcome Email with the link to confirm.
   *
   * @param user user created
   * @throws EmailException Exception when sending mail */
  private void sendMailAskForConfirmation(User user) throws EmailException, MalformedURLException {
    String subject = Messages.get("mail.confirm.subject");
    String urlString = "http://" + Configuration.root().getString("server.hostname");
    urlString += "/confirm/" + user.confirmationToken; URL url = new URL(urlString); // validate the URL, will throw an exception if bad.

    String message = Messages.get("mail.confirm.message", url.toString());

    Mail.Envelop envelop = new Mail.Envelop(subject, message, user.email);
    Mail mailer = new Mail(mailerClient); mailer.sendMail(envelop);
  }


  /**
   * Validate an account with the url in the confirm mail.
   *
   * @param token a token attached to the user we're confirming.
   * @return Confirmationpage */
  @Transactional
  public Result confirm(String confirmToken) {
    User user = User.findByConfirmationToken(confirmToken);
    if (user == null) {
      flash("error", Messages.get("error.unknown.email"));
//      return badRequest(views.html.confirm.render());
    } if (user.validated) {
      flash("error", Messages.get("error.account.already.validated"));
     // return badRequest(views.html.confirm.render());
    } try {
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
    return badRequest(views.html.home.render());
  }

  /**
   * Send the confirm mail.
   *
   * @param user user created
   * @throws EmailException Exception when sending mail */
  private void sendMailConfirmation(User user) throws EmailException {
    String subject = Messages.get("mail.welcome.subject");
    String message = Messages.get("mail.welcome.message");
    Mail.Envelop envelop = new Mail.Envelop(subject, message, user.email);
    Mail mailer = new Mail(mailerClient); mailer.sendMail(envelop);
  }


  public Result register() {
    // Form<Login> loginForm = formFactory.form(Login.class);
    //return ok(views.html.account.register.render());
    return ok(views.html.account.login.render("B"));
  }


/*
  @Transactional(readOnly = true)
  public Result authenticate() {
    Form<Login> form = formFactory.form(Login.class).bindFromRequest();

    if (form.hasErrors()) {
      return badRequest(views.html.login.render(form));
    } else {
      session().clear();
      session("email", form.get().email);
      return redirect(routes.Dashboard.index());
    }
  }

  public Result logout() {
    session().clear();
    flash("success", Messages.get("you.have.been.logged.out"));
    return redirect(routes.Application.login());
  }
*/
}

