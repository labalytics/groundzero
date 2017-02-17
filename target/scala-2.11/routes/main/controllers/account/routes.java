
// @GENERATOR:play-routes-compiler
// @SOURCE:C:/Users/Mahesh/Documents/Project/SEP/Labalytics/conf/routes
// @DATE:Mon Feb 13 23:21:19 CST 2017

package controllers.account;

import router.RoutesPrefix;

public class routes {
  
  public static final controllers.account.ReverseSignup Signup = new controllers.account.ReverseSignup(RoutesPrefix.byNamePrefix());

  public static class javascript {
    
    public static final controllers.account.javascript.ReverseSignup Signup = new controllers.account.javascript.ReverseSignup(RoutesPrefix.byNamePrefix());
  }

}
