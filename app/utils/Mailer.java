package utils;

import models.Lab;
import models.User;
import org.apache.commons.mail.EmailException;
import play.Configuration;
import play.db.jpa.Transactional;
import play.i18n.Messages;
import play.libs.mailer.MailerClient;
import play.mvc.Result;

import javax.inject.Inject;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by aniketchitale7 on 4/3/17.
 */

public class Mailer {
  private MailerClient mailerClient;

  public Mailer(MailerClient mailerClient)
  {
    this.mailerClient = mailerClient;

  }

  /**
   * Send the welcome Email with the link to confirm.
   *
   * @param user user created
   * @throws EmailException Exception when sending mail
   */
  public void sendMailAskForConfirmation(User user) throws EmailException, MalformedURLException {
    String subject = Messages.get("mail.confirm.subject");
    String urlString = "http://" + Configuration.root().getString("server.hostname");
    urlString += "/confirm/" + user.confirmationToken;
    URL url = new URL(urlString); // validate the URL, will throw an exception if bad.
   String message = Messages.get("mail.confirm.message", url.toString());

    Mail.Envelop envelop = new Mail.Envelop(subject, message, user.email);
    Mail mailer = new Mail(mailerClient);
    mailer.sendMail(envelop);
  }

  /**
   * Send the Email to the Manager when he add a new Lab under his account.
   *
   * @param user user created
   * @throws EmailException Exception when sending mail
   */
  public void sendEmailForNewLab(Lab lab , String email) throws EmailException, MalformedURLException {
    String subject = Messages.get("mail.labAdded.subject");
    String message = Messages.get("mail.labAdded.message", lab.labName);
    Mail.Envelop envelop = new Mail.Envelop(subject, message, email);
    Mail mailer = new Mail(mailerClient);
    mailer.sendMail(envelop);
  }

  /**
   * Send the Email to the Manager when admin a manager.
   *
   * @param user user created
   * @throws EmailException Exception when sending mail
   */
  public void sendEmailWithManagerPassword(User user , String password) throws EmailException, MalformedURLException {
    String subject = Messages.get("mail.confirm.subject");
    String urlString = "http://" + Configuration.root().getString("server.hostname");
    urlString += "/authorize#/login";
    URL url = new URL(urlString); // validate the URL, will throw an exception if bad.
    String message = Messages.get("mail.resetPassword.message", user.email, password , url.toString());
    Mail.Envelop envelop = new Mail.Envelop(subject, message, user.email);
    Mail mailer = new Mail(mailerClient);
    mailer.sendMail(envelop);
  }


  /**
   * Send the confirm mail.
   *
   * @param user user created
   * @throws EmailException Exception when sending mail
   */
  private void sendMailConfirmation(User user) throws EmailException {
    String subject = Messages.get("mail.welcome.subject");
    String message = Messages.get("mail.welcome.message");
    Mail.Envelop envelop = new Mail.Envelop(subject, message, user.email);
    Mail mailer = new Mail(mailerClient);
    mailer.sendMail(envelop);
  }


}
