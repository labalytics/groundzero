
package views.html

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object index_Scope0 {
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

class index extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template2[String,Html,play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*1.2*/(title: String)(content: Html):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*1.32*/("""
"""),format.raw/*2.1*/("""<!doctype html>
<html lang="en" data-framework="angular2">
    <head>
        """),format.raw/*5.99*/("""
    """),format.raw/*6.5*/("""<meta charset="utf-8">
    <title>Angular2 • TodoMVC</title>
    <link rel="stylesheet" href=""""),_display_(/*8.35*/routes/*8.41*/.Assets.versioned("lib/todomvc-common/base.css")),format.raw/*8.89*/("""">
    <link rel="stylesheet" href="assets/stylesheets/todomvc-app.css">
    <script src='"""),_display_(/*10.19*/routes/*10.25*/.Assets.versioned("lib/angular2/bundles/angular2-polyfills.js")),format.raw/*10.88*/("""'></script>
    <script src='"""),_display_(/*11.19*/routes/*11.25*/.Assets.versioned("lib/systemjs/dist/system.js")),format.raw/*11.73*/("""'></script>
    <script src='"""),_display_(/*12.19*/routes/*12.25*/.Assets.versioned("lib/typescript/lib/typescript.js")),format.raw/*12.78*/("""'></script>
    <script src='"""),_display_(/*13.19*/routes/*13.25*/.Assets.versioned("lib/rxjs/bundles/Rx.js")),format.raw/*13.68*/("""'></script>
    <script src='"""),_display_(/*14.19*/routes/*14.25*/.Assets.versioned("lib/angular2/bundles/angular2.dev.js")),format.raw/*14.82*/("""'></script>

    </head>
    <body>
        <todo-app></todo-app>
      """),_display_(/*19.8*/content),format.raw/*19.15*/("""
        """),format.raw/*20.9*/("""<footer class="info">
            <p>Double-click to edit a todo</p>
            <p>
				Created by <a href="http://github.com/samccone">Sam Saccone</a>
                and <a href="http://github.com/colineberhardt">Colin Eberhardt</a>
                using <a href="http://angular.io">Angular2</a>
			</p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
        <script>
        """),format.raw/*30.101*/("""
			"""),format.raw/*31.4*/("""System.config("""),format.raw/*31.18*/("""{"""),format.raw/*31.19*/("""
                """),format.raw/*32.17*/("""transpiler: 'typescript',
                typescriptOptions: """),format.raw/*33.36*/("""{"""),format.raw/*33.37*/("""
                               """),format.raw/*34.105*/("""
                                """),format.raw/*35.33*/("""emitDecoratorMetadata: true,
                                experimentalDecorators: true
                            """),format.raw/*37.29*/("""}"""),format.raw/*37.30*/(""",
                            packages: """),format.raw/*38.39*/("""{"""),format.raw/*38.40*/("""
                                """),format.raw/*39.33*/("""'assets/app': """),format.raw/*39.47*/("""{"""),format.raw/*39.48*/("""
                                    """),format.raw/*40.37*/("""defaultExtension: 'ts' """),format.raw/*40.123*/("""
                                """),format.raw/*41.33*/("""}"""),format.raw/*41.34*/(""",
                                'assets/lib': """),format.raw/*42.47*/("""{"""),format.raw/*42.48*/("""
                                    """),format.raw/*43.37*/("""defaultExtension: 'js' """),format.raw/*43.102*/("""
                                """),format.raw/*44.33*/("""}"""),format.raw/*44.34*/("""
                            """),format.raw/*45.29*/("""}"""),format.raw/*45.30*/(""",
                            map: """),format.raw/*46.34*/("""{"""),format.raw/*46.35*/("""
                                """),format.raw/*47.33*/("""'app' : 'assets/app' """),format.raw/*47.115*/("""
                            """),format.raw/*48.29*/("""}"""),format.raw/*48.30*/("""
                        """),format.raw/*49.25*/("""}"""),format.raw/*49.26*/(""");
                        System.import('app/bootstrap')
                                .then(null, console.error.bind(console));
                    </script>
    </body>
</html>
"""))
      }
    }
  }

  def render(title:String,content:Html): play.twirl.api.HtmlFormat.Appendable = apply(title)(content)

  def f:((String) => (Html) => play.twirl.api.HtmlFormat.Appendable) = (title) => (content) => apply(title)(content)

  def ref: this.type = this

}


}

/**/
object index extends index_Scope0.index
              /*
                  -- GENERATED --
                  DATE: Mon Feb 13 23:21:20 CST 2017
                  SOURCE: C:/Users/Mahesh/Documents/Project/SEP/Labalytics/app/views/index.scala.html
                  HASH: d4d776c5423a5d1ae3188710a7dcdbd7b965501b
                  MATRIX: 750->1|875->31|902->32|1007->200|1038->205|1159->300|1173->306|1241->354|1359->445|1374->451|1458->514|1515->544|1530->550|1599->598|1656->628|1671->634|1745->687|1802->717|1817->723|1881->766|1938->796|1953->802|2031->859|2130->932|2158->939|2194->948|2641->1458|2672->1462|2714->1476|2743->1477|2788->1494|2877->1555|2906->1556|2967->1661|3028->1694|3174->1812|3203->1813|3271->1853|3300->1854|3361->1887|3403->1901|3432->1902|3497->1939|3549->2025|3610->2058|3639->2059|3715->2107|3744->2108|3809->2145|3861->2210|3922->2243|3951->2244|4008->2273|4037->2274|4100->2309|4129->2310|4190->2343|4240->2425|4297->2454|4326->2455|4379->2480|4408->2481
                  LINES: 27->1|32->1|33->2|36->5|37->6|39->8|39->8|39->8|41->10|41->10|41->10|42->11|42->11|42->11|43->12|43->12|43->12|44->13|44->13|44->13|45->14|45->14|45->14|50->19|50->19|51->20|61->30|62->31|62->31|62->31|63->32|64->33|64->33|65->34|66->35|68->37|68->37|69->38|69->38|70->39|70->39|70->39|71->40|71->40|72->41|72->41|73->42|73->42|74->43|74->43|75->44|75->44|76->45|76->45|77->46|77->46|78->47|78->47|79->48|79->48|80->49|80->49
                  -- GENERATED --
              */
          