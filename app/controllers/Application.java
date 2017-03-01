package controllers;

import models.User;
import play.db.jpa.Transactional;
import play.libs.Json;
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

//    public String GetUserInfo(){
//      return "THIS IS FROM SERVICE";
//    }

  @Transactional
    public Result GetUserInfo() {
//        public static class User {
//            public String firstName;
//            public String lastName;
//            public String email;
//            public int age;
//        }

        UserCore UC = new UserCore();

        User user = new User();
        user.email = "dbjfb";
        user.firstName = "djhg";
        user.lastName ="dhg";
        user.passwordHash = "dbgjvn";
        List<User> res =  UC.selectAllFriends();
        UC.InsertUser(user);
        //String res = "";
        return ok(Json.toJson(res));
    }
}
