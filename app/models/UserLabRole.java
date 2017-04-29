package models;

import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.jpa.JPA;

import javax.persistence.*;
import java.util.Date;

import utils.Hash;

@Entity
@Table(name = "user_lab_roles")
public class UserLabRole {

  @Id
  @Column(name = "user_lab_role_id")
  @Formats.NonEmpty
  @GeneratedValue(strategy=GenerationType.AUTO)
  public Long id;

  @ManyToOne
  @JoinColumn(name = "lab_id")
  @Constraints.Required
  @Formats.NonEmpty
  public Lab labId;

  @ManyToOne
  @JoinColumn(name = "role_id")
  @Constraints.Required
  @Formats.NonEmpty
  public Role roleId;

  @ManyToOne
  @JoinColumn(name = "user_id")
  @Constraints.Required
  @Formats.NonEmpty
  public User userId;

  @Column(name = "status")
  public String status;

  //TODO
  //Foreign key relationships
}
