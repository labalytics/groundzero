package models;

import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.jpa.JPA;

import javax.persistence.*;
import java.util.Date;

import utils.Hash;

@Entity
@Table(name = "USERLABROLES")
public class UserLabRole {

  @Id
  @Column(name = "user_lab_role_id")
  @Formats.NonEmpty
  @GeneratedValue(strategy=GenerationType.AUTO)
  public Long id;

  @Column(name = "lab_id")
  @Constraints.Required
  @Formats.NonEmpty
  public String labId;

  @Column(name = "role_id")
  @Constraints.Required
  @Formats.NonEmpty
  public String roleId;

  @Column(name = "status")
  public String status;

  //TODO
  //Foreign key relationships
}
