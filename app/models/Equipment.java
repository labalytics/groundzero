package models;

import play.data.format.Formats;
import play.data.validation.Constraints;

import javax.persistence.*;

@Entity
@Table(name = "equipments")
public class Equipment {

  @Id
  @Column(name = "id")
  @Formats.NonEmpty
  @GeneratedValue(strategy=GenerationType.AUTO)
  public Long id;

  @Column(name = "name")
  @Constraints.Required
  @Formats.NonEmpty
  public String equipmentName;

  @Column(name = "description")
  @Constraints.Required
  @Formats.NonEmpty
  public String description;


  @Column(name = "type")
  @Constraints.Required
  @Formats.NonEmpty
  public String equipmentType;

  @Column(name = "usage_notification")
  @Constraints.Required
  @Formats.NonEmpty
  public long usageNotification;

  @Column(name = "working_rate")
  @Constraints.Required
  @Formats.NonEmpty
  public double workingRate;

  @Column(name = "nonworking_rate")
  @Constraints.Required
  @Formats.NonEmpty
  public double nonworkingRate;

  @Column(name = "status")
  @Constraints.Required
  @Formats.NonEmpty
  public String status;

  @ManyToOne
  @JoinColumn(name = "labid")
  @Formats.NonEmpty
  public Lab lab;



}
