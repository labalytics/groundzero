package controllers;

import models.User;
import play.db.jpa.Transactional;
import play.libs.Json;
import views.html.home;
import views.html.welcome;
import play.mvc.Controller;
import play.mvc.Result;
import core.UserCore;
import java.util.*;


public class Application extends Controller {

  public Result index() {
    /** change the template here to use a different way of compilation and loading of the ts ng2 app.
     * index()  :    does no ts compilation in advance. the ts files are download by the browser and compiled there to js.
     * main() :    compiles the ts files to individual js files. Systemjs loads the individual files.
     * index2() :    add the option -DtsCompileMode=stage to your sbt task . F.i. 'sbt ~run -DtsCompileMode=stage' this will produce the app as one single js file.
     */
    return ok(welcome.render());
  }


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

}
