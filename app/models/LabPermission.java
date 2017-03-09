package models;

import play.data.format.Formats;
import play.data.validation.Constraints;

import javax.persistence.*;

@Entity
@Table(name = "LABPERMISSIONS")
public class LabPermission {

  @Id
  @Column(name = "lab_permissions_id")
  @Formats.NonEmpty
  @GeneratedValue(strategy=GenerationType.AUTO)
  public Long id;

  @Column(name = "current_lab_id")
  @Constraints.Required
  @Formats.NonEmpty
  public String currentLabId;

  @Column(name = "requested_lab_id")
  @Constraints.Required
  @Formats.NonEmpty
  public String requestedLabId;

  @Column(name = "status")
  @Constraints.Required
  public String status;

  //TODO
  //Foreign key relationships
}
