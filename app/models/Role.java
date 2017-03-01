package models;

import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.jpa.JPA;

import javax.persistence.*;
import java.util.Date;

import utils.Hash;

@Entity
@Table(name = "ROLE")
public class Role {

  @Id
  @Column(name = "role_id")
  @Formats.NonEmpty
  @GeneratedValue(strategy=GenerationType.AUTO)
  public Long id;

  @Column(name = "role_name")
  @Constraints.Required
  @Formats.NonEmpty
  public String roleName;

  @Column(name = "status")
  @Constraints.Required
  public String status;

}
