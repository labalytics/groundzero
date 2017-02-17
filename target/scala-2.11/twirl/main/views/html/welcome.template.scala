
package views.html

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object welcome_Scope0 {
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

class welcome extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template0[play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply():play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](_display_(/*1.2*/main("main")/*1.14*/ {_display_(Seq[Any](format.raw/*1.16*/("""
  """),format.raw/*2.3*/("""<todo-app></todo-app>
""")))}),format.raw/*3.2*/("""
"""))
      }
    }
  }

  def render(): play.twirl.api.HtmlFormat.Appendable = apply()

  def f:(() => play.twirl.api.HtmlFormat.Appendable) = () => apply()

  def ref: this.type = this

}


}

/**/
object welcome extends welcome_Scope0.welcome
              /*
                  -- GENERATED --
                  DATE: Mon Feb 13 23:21:20 CST 2017
                  SOURCE: C:/Users/Mahesh/Documents/Project/SEP/Labalytics/app/views/welcome.scala.html
                  HASH: 483daf3c8529fb000e9fd935e1134d5b31d4851c
                  MATRIX: 831->1|851->13|890->15|919->18|971->41
                  LINES: 32->1|32->1|32->1|33->2|34->3
                  -- GENERATED --
              */
          