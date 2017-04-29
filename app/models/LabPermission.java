package models;

import play.data.format.Formats;
import play.data.validation.Constraints;

import javax.persistence.*;

@Entity
@Table(name = "lab_permissions")
public class LabPermission {

  @Id
  @Column(name = "lab_permissions_id")
  @Formats.NonEmpty
  @GeneratedValue(strategy=GenerationType.AUTO)
  public Long id;

  @ManyToOne
  @JoinColumn(name = "current_lab_id")
  @Constraints.Required
  @Formats.NonEmpty
  public Lab currentLab;

  @ManyToOne
  @JoinColumn(name = "requested_lab_id")
  @Constraints.Required
  @Formats.NonEmpty
  public Lab requestedLab;


  @Column(name = "status")
  @Constraints.Required
  public String status;

  //TODO
  //Foreign key relationships
}
