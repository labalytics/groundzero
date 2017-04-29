package models;

import play.data.format.Formats;
import play.data.validation.Constraints;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "bookings")
public class Schedule {

  @Id
  @Column(name = "booking_id")
  @Formats.NonEmpty
  @GeneratedValue(strategy=GenerationType.AUTO)
  public Long id;

  @ManyToOne
  @JoinColumn(name = "equipmentId")
  @Formats.NonEmpty
  public Equipment equipmentId;

  @ManyToOne
  @JoinColumn(name = "equipmentUnitId")
  @Constraints.Required
  @Formats.NonEmpty
  public EquipmentUnit equipmentUnitId;


  @ManyToOne
  @JoinColumn(name = "userId")
  @Constraints.Required
  @Formats.NonEmpty
  public User userId;

  @ManyToOne
  @JoinColumn(name = "userLabId")
  @Constraints.Required
  @Formats.NonEmpty
  public Lab userLabId;

  @Column(name = "startTime")
  @Constraints.Required
  @Formats.NonEmpty
  public Date startTime;

  @Column(name = "endTime")
  @Constraints.Required
  @Formats.NonEmpty
  public Date endTime;

  @Column(name = "status")
  @Constraints.Required
  @Formats.NonEmpty
  public String status;

  @Column(name = "workingRate")
  @Formats.NonEmpty
  public double workingRate;

  @Column(name = "nonWorkingRate")
  @Constraints.Required
  @Formats.NonEmpty
  public double nonworkingRate;




}
