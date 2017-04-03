package core;

import models.Lab;
import models.UserLabRole;
import play.Logger;
import play.db.jpa.JPAApi;
import play.libs.Json;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.*;

public class ResponseCore {
  public String status;
  public String message;
  public HashMap<String,Object> response;
}
