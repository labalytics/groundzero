package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.inject.Inject;
import core.LabCore;
import core.StudentCore;
import models.User;
import models.UserLabRole;
import play.Logger;
import play.api.libs.mailer.MailerClient;
import play.data.FormFactory;
import play.db.jpa.JPAApi;
import play.db.jpa.Transactional;
import play.libs.Json;
import views.html.home.home;
import views.html.app.welcome;
import play.mvc.Controller;
import play.mvc.Result;
import core.UserCore;
import java.util.*;


public class Application extends Controller {

  private final FormFactory formFactory;
  private final JPAApi jpaApi;
  private final MailerClient mailerClient;
  final Logger.ALogger logger = Logger.of(this.getClass());

  @Inject
  public Application(FormFactory formFactory, JPAApi jpaApi , MailerClient mailerClient) {
    this.formFactory = formFactory;
    this.jpaApi = jpaApi;
    this.mailerClient = mailerClient;
  }


  public Result index() {
    /** change the template here to use a different way of compilation and loading of the ts ng2 app.
     * index()  :    does no ts compilation in advance. the ts files are download by the browser and compiled there to js.
     * main() :    compiles the ts files to individual js files. Systemjs loads the individual files.
     * index2() :    add the option -DtsCompileMode=stage to your sbt task . F.i. 'sbt ~run -DtsCompileMode=stage' this will produce the app as one single js file.
     */
    return ok(welcome.render());
  }


//  public Result home(String subroute){
//    return ok(home.render());
//  }

  public Result home(){
    return ok(home.render());
  }

  @Transactional
  public Result GetUserInfo() {
    UserCore UC = new UserCore();

    User user = new User();
    user.email = "dbjfb";
    user.firstName = "djhg";
    user.lastName ="dhg";
    user.passwordHash = "dbgjvn";
    return ok(Json.toJson(user));
  }

  @Transactional
  public Result getstudent(){
    JsonNode json = request().body().asJson();
    StudentCore studentCore = new StudentCore();

    ArrayList<UserLabRole> students =  studentCore.GetStudents(jpaApi,  json.findPath("labid").asLong());

    return ok(Json.toJson(students));
  }
  @Transactional
  public Result getAllLabs(){
    JsonNode json = request().body().asJson();

    ArrayList<UserLabRole> labs =  LabCore.GetAllLabs(jpaApi);

    return ok(Json.toJson(labs));
  }

}
