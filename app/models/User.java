package models;


import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.jpa.JPA;

import javax.persistence.*;
import java.util.Date;

import utils.Hash;


import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import java.io.Serializable;
/**
 * Created by sai on 2/18/16.
 */

@Entity
@Table(name = "User")
public class User{

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column(name = "fname")
  private String name;

  @Column(name = "lname")
  private String lname;

  @Column(name = "email")
  private String email;

  @Column(name ="password")
  private  String pwsd;

  public String getPwsd() {
    return pwsd;
  }

  public void setPwsd(String pwsd) {
    this.pwsd = pwsd;
  }

  public Date getDob() {
    return dob;
  }

  public void setDob(Date dob) {
    this.dob = dob;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getEmail() {

    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getLname() {

    return lname;
  }

  public void setLname(String lname) {
    this.lname = lname;
  }

  @Column(name = "dob")
  private Date dob;

  public String getName() {
    return name;
  }

  public Long getId() {
    return id;
  }



  public void setName(String name) {
    this.name = name;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  @Column(name = "role")
  private String role;

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  @Column(name = "status")
  private String status;

  @Column(name ="gender")
  private String gender;

  public String getGender() {
    return gender;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }
}
