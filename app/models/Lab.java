package models;

import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.jpa.JPA;

import javax.persistence.*;
import java.util.Date;

import utils.Hash;

@Entity
@Table(name = "LABS")
public class Lab {

  @Id
  @Column(name = "lab_id")
  @Formats.NonEmpty
  @GeneratedValue(strategy=GenerationType.AUTO)
  public Long id;

  @Column(name = "lab_name")
  @Constraints.Required
  @Formats.NonEmpty
  public String labName;

  @Column(name = "lab_pi")
  @Constraints.Required
  @Formats.NonEmpty
  public String labPi;
}
