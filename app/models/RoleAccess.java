package models;

import play.data.format.Formats;
import play.data.validation.Constraints;

import javax.persistence.*;

@Entity
@Table(name = "role_access")
public class RoleAccess {

  @Id
  @Column(name = "id")
  @Formats.NonEmpty
  @GeneratedValue(strategy=GenerationType.AUTO)
  public Long id;

  @ManyToOne
  @JoinColumn(name = "role_menu_id")
  @Formats.NonEmpty
  public Role role;

  @Column(name = "menu_name")
  @Formats.NonEmpty
  public String menu_name;

  @Column(name = "status")
  @Formats.NonEmpty
  public String status;

}
