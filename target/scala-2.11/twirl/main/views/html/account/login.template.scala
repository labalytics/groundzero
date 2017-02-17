
package views.html.account

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object login_Scope0 {
import models._
import controllers._
import play.api.i18n._
import views.html._
import play.api.templates.PlayMagic._
import java.lang._
import java.util._
import scala.collection.JavaConversions._
import scala.collection.JavaConverters._
import play.core.j.PlayMagicForJava._
import play.mvc._
import play.data._
import play.api.data.Field
import play.mvc.Http.Context.Implicit._

class login extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template1[String,play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*1.2*/(level: String):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*1.17*/("""

"""),_display_(/*3.2*/main("login")/*3.15*/ {_display_(Seq[Any](format.raw/*3.17*/("""

  """),format.raw/*5.3*/("""<h3>THis part is common for Login and Register</h3>
  <todo-login-app>Loading login</todo-login-app>

  """),_display_(/*8.4*/level/*8.9*/ match/*8.15*/ {/*10.5*/case "A" =>/*10.16*/ {_display_(Seq[Any](format.raw/*10.18*/("""
      """),format.raw/*11.7*/("""<h1>THis is A</h1>
    """)))}/*14.5*/case "B" =>/*14.16*/ {_display_(Seq[Any](format.raw/*14.18*/("""
      """),format.raw/*15.7*/("""<h1>THis is B</h1>
    """)))}/*18.5*/case "C" =>/*18.16*/ {_display_(Seq[Any](format.raw/*18.18*/("""
      """),format.raw/*19.7*/("""<h1>THis is C</h1>
    """)))}}),format.raw/*21.4*/("""
""")))}),format.raw/*22.2*/("""

"""),format.raw/*24.22*/("""
"""),format.raw/*25.31*/("""
"""),format.raw/*26.26*/("""
"""),format.raw/*27.29*/("""
"""),format.raw/*28.6*/("""
"""))
      }
    }
  }

  def render(level:String): play.twirl.api.HtmlFormat.Appendable = apply(level)

  def f:((String) => play.twirl.api.HtmlFormat.Appendable) = (level) => apply(level)

  def ref: this.type = this

}


}

/**/
object login extends login_Scope0.login
              /*
                  -- GENERATED --
                  DATE: Mon Feb 13 23:21:20 CST 2017
                  SOURCE: C:/Users/Mahesh/Documents/Project/SEP/Labalytics/app/views/account/login.scala.html
                  HASH: b97a8548d25c661493601ee214bf2ea02586da04
                  MATRIX: 753->1|863->16|891->19|912->32|951->34|981->38|1111->143|1123->148|1137->154|1147->162|1167->173|1207->175|1241->182|1283->212|1303->223|1343->225|1377->232|1419->262|1439->273|1479->275|1513->282|1568->310|1600->312|1630->335|1659->366|1688->392|1717->421|1745->427
                  LINES: 27->1|32->1|34->3|34->3|34->3|36->5|39->8|39->8|39->8|39->10|39->10|39->10|40->11|41->14|41->14|41->14|42->15|43->18|43->18|43->18|44->19|45->21|46->22|48->24|49->25|50->26|51->27|52->28
                  -- GENERATED --
              */
          