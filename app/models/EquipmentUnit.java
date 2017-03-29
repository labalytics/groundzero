package models;

import play.data.format.Formats;
import play.data.validation.Constraints;

import javax.persistence.*;

@Entity
@Table(name = "equipments")
public class EquipmentUnit {

  @Id
  @Column(name = "id")
  @Formats.NonEmpty
  @GeneratedValue(strategy=GenerationType.AUTO)
  public Long id;

  @ManyToOne
  @JoinColumn(name = "equipment_id")
  @Formats.NonEmpty
  public Equipment equipment;


  @Column(name = "units_count")
  @Constraints.Required
  @Formats.NonEmpty
  public long units_count;


  @Column(name = "available_count")
  @Constraints.Required
  @Formats.NonEmpty
  public long available_count;

  @Column(name = "type")
  @Constraints.Required
  @Formats.NonEmpty
  public String type;

  @ManyToOne
  @JoinColumn(name = "parent_equip")
  @Formats.NonEmpty
  public Equipment parentEquipment;


  @Column(name = "status")
  @Constraints.Required
  @Formats.NonEmpty
  public String status;


}
