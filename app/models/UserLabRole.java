package models;

import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.jpa.JPA;

import javax.persistence.*;
import java.util.Date;

import utils.Hash;

@Entity
@Table(name = "USERLABROLE")
public class UserLabRole {

  @Id
  @Column(name = "userlabrole_id")
  @Formats.NonEmpty
  @GeneratedValue(strategy=GenerationType.AUTO)
  public Long id;

  @Column(name = "role_id")
  @Constraints.Required
  @Formats.NonEmpty
  public String roleId;

  @Column(name = "user_id")
  @Constraints.Required
  @Formats.NonEmpty
  public String userId;

  @Column(name = "status")
  @Constraints.Required
  public String status;
}
