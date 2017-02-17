
package views.html

import play.twirl.api._
import play.twirl.api.TemplateMagic._


     object main_Scope0 {
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

class main extends BaseScalaTemplate[play.twirl.api.HtmlFormat.Appendable,Format[play.twirl.api.HtmlFormat.Appendable]](play.twirl.api.HtmlFormat) with play.twirl.api.Template2[String,Html,play.twirl.api.HtmlFormat.Appendable] {

  /**/
  def apply/*1.2*/(title: String)(content: Html):play.twirl.api.HtmlFormat.Appendable = {
    _display_ {
      {


Seq[Any](format.raw/*1.32*/("""
"""),format.raw/*2.1*/("""<!doctype html>
<html lang="en" data-framework="angular2">
    <head>
        """),format.raw/*6.47*/("""
        """),format.raw/*7.9*/("""<meta charset="utf-8">
        <title>"""),_display_(/*8.17*/title),format.raw/*8.22*/("""</title>
        <link rel="stylesheet" href=""""),_display_(/*9.39*/routes/*9.45*/.Assets.versioned("lib/todomvc-common/base.css")),format.raw/*9.93*/("""">
        <link rel="stylesheet" href="assets/stylesheets/todomvc-app.css">
        <script type='text/javascript' src='"""),_display_(/*11.46*/routes/*11.52*/.Assets.versioned("lib/systemjs/dist/system-polyfills.js")),format.raw/*11.110*/("""'></script>
        <script type='text/javascript' src='"""),_display_(/*12.46*/routes/*12.52*/.Assets.versioned("lib/core-js/client/shim.min.js")),format.raw/*12.103*/("""'></script>
        <script type='text/javascript' src='"""),_display_(/*13.46*/routes/*13.52*/.Assets.versioned("lib/zone.js/dist/zone.js")),format.raw/*13.97*/("""'></script>
        <script type='text/javascript' src='"""),_display_(/*14.46*/routes/*14.52*/.Assets.versioned("lib/reflect-metadata/Reflect.js")),format.raw/*14.104*/("""'></script>
        <script type='text/javascript' src='"""),_display_(/*15.46*/routes/*15.52*/.Assets.versioned("lib/systemjs/dist/system.src.js")),format.raw/*15.104*/("""'></script>

        <script>    """),format.raw/*18.59*/("""
            """),format.raw/*19.13*/("""var map = """),format.raw/*19.23*/("""{"""),format.raw/*19.24*/("""
                """),format.raw/*20.17*/("""'app': 'assets',
                '@angular':'assets/lib/@angular',
                'rxjs':'assets/lib/rxjs',
                'symbol-observable': 'assets/lib/symbol-observable'

            """),format.raw/*25.13*/("""}"""),format.raw/*25.14*/(""";

        var file = "bootstrap." + """"),_display_(/*27.37*/title),format.raw/*27.42*/("""";

        var packages = """),format.raw/*29.24*/("""{"""),format.raw/*29.25*/("""
                """),format.raw/*30.17*/("""'app': """),format.raw/*30.24*/("""{"""),format.raw/*30.25*/("""main: file + '.js', defaultExtension: 'js'"""),format.raw/*30.67*/("""}"""),format.raw/*30.68*/(""",
                'rxjs': """),format.raw/*31.25*/("""{"""),format.raw/*31.26*/("""defaultExtension: 'js'"""),format.raw/*31.48*/("""}"""),format.raw/*31.49*/(""",
                'assets/lib': """),format.raw/*32.31*/("""{"""),format.raw/*32.32*/("""defaultExtension: 'js'"""),format.raw/*32.54*/("""}"""),format.raw/*32.55*/(""",
                'symbol-observable': """),format.raw/*33.38*/("""{"""),format.raw/*33.39*/("""defaultExtension: 'js', main: 'index.js'"""),format.raw/*33.79*/("""}"""),format.raw/*33.80*/("""
            """),format.raw/*34.13*/("""}"""),format.raw/*34.14*/(""";
        var ngPackageNames = [
                'common',
                'compiler',
                'core',
                'forms',
                'http',
                'platform-browser',
                'platform-browser-dynamic',
                'router'
            ];

        function packIndex(pkgName) """),format.raw/*46.37*/("""{"""),format.raw/*46.38*/("""
          """),format.raw/*47.11*/("""packages['@angular/'+pkgName] = """),format.raw/*47.44*/("""{"""),format.raw/*47.45*/(""" """),format.raw/*47.46*/("""main: 'index.js', defaultExtension: 'js' """),format.raw/*47.87*/("""}"""),format.raw/*47.88*/(""";
        """),format.raw/*48.9*/("""}"""),format.raw/*48.10*/("""
        """),format.raw/*49.9*/("""function packUmd(pkgName) """),format.raw/*49.35*/("""{"""),format.raw/*49.36*/("""
          """),format.raw/*50.11*/("""packages['@angular/'+pkgName] = """),format.raw/*50.44*/("""{"""),format.raw/*50.45*/(""" """),format.raw/*50.46*/("""main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' """),format.raw/*50.110*/("""}"""),format.raw/*50.111*/(""";
        """),format.raw/*51.9*/("""}"""),format.raw/*51.10*/("""
          """),format.raw/*52.11*/("""// Most environments should use UMD; some (Karma) need the individual index files
        function addAngularModulesToMap(pkgName) """),format.raw/*53.50*/("""{"""),format.raw/*53.51*/("""
          """),format.raw/*54.11*/("""map['@angular/'+pkgName] = 'assets/lib/angular__' + pkgName;
        """),format.raw/*55.9*/("""}"""),format.raw/*55.10*/("""

          """),format.raw/*57.11*/("""// Add package entries for angular packages
        var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
        ngPackageNames.forEach(setPackageConfig)

          // Add map entries for angular packages
        ngPackageNames.forEach(function(pkgName)"""),format.raw/*62.49*/("""{"""),format.raw/*62.50*/("""
           """),format.raw/*63.12*/("""addAngularModulesToMap(pkgName)
        """),format.raw/*64.9*/("""}"""),format.raw/*64.10*/(""");

        System.config("""),format.raw/*66.23*/("""{"""),format.raw/*66.24*/("""
            """),format.raw/*67.13*/("""map : map,
            packages: packages,
        """),format.raw/*69.9*/("""}"""),format.raw/*69.10*/(""");
        """),format.raw/*70.110*/("""
        """),format.raw/*71.9*/("""System.import('app')
            .catch(console.error.bind(console));

		</script>
    </head>
    <body>


      """),_display_(/*79.8*/content),format.raw/*79.15*/("""

        """),format.raw/*81.9*/("""<footer class="info">
            <p>Double-click to edit a todo</p>
            <p>
				Created by <a href="http://github.com/samccone">Sam Saccone</a> and <a href="http://github.com/colineberhardt">Colin Eberhardt</a>
                using <a href="http://angular.io">Angular2</a>
			</p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
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
object main extends main_Scope0.main
              /*
                  -- GENERATED --
                  DATE: Mon Feb 13 23:21:20 CST 2017
                  SOURCE: C:/Users/Mahesh/Documents/Project/SEP/Labalytics/app/views/main.scala.html
                  HASH: a212f163a2b1be1592ff8c23ea4035a2385a3f6f
                  MATRIX: 748->1|873->31|900->32|1005->252|1040->261|1105->300|1130->305|1203->352|1217->358|1285->406|1434->528|1449->534|1529->592|1613->649|1628->655|1701->706|1785->763|1800->769|1866->814|1950->871|1965->877|2039->929|2123->986|2138->992|2212->1044|2273->1203|2314->1216|2352->1226|2381->1227|2426->1244|2644->1436|2673->1437|2739->1476|2765->1481|2820->1508|2849->1509|2894->1526|2929->1533|2958->1534|3028->1576|3057->1577|3111->1603|3140->1604|3190->1626|3219->1627|3279->1659|3308->1660|3358->1682|3387->1683|3454->1722|3483->1723|3551->1763|3580->1764|3621->1777|3650->1778|3995->2095|4024->2096|4063->2107|4123->2140|4152->2141|4181->2142|4250->2183|4279->2184|4316->2194|4345->2195|4381->2204|4435->2230|4464->2231|4503->2242|4563->2275|4592->2276|4621->2277|4714->2341|4744->2342|4781->2352|4810->2353|4849->2364|5008->2495|5037->2496|5076->2507|5172->2577|5201->2578|5241->2590|5539->2860|5568->2861|5608->2873|5675->2913|5704->2914|5758->2940|5787->2941|5828->2954|5906->3005|5935->3006|5975->3118|6011->3127|6152->3242|6180->3249|6217->3259
                  LINES: 27->1|32->1|33->2|36->6|37->7|38->8|38->8|39->9|39->9|39->9|41->11|41->11|41->11|42->12|42->12|42->12|43->13|43->13|43->13|44->14|44->14|44->14|45->15|45->15|45->15|47->18|48->19|48->19|48->19|49->20|54->25|54->25|56->27|56->27|58->29|58->29|59->30|59->30|59->30|59->30|59->30|60->31|60->31|60->31|60->31|61->32|61->32|61->32|61->32|62->33|62->33|62->33|62->33|63->34|63->34|75->46|75->46|76->47|76->47|76->47|76->47|76->47|76->47|77->48|77->48|78->49|78->49|78->49|79->50|79->50|79->50|79->50|79->50|79->50|80->51|80->51|81->52|82->53|82->53|83->54|84->55|84->55|86->57|91->62|91->62|92->63|93->64|93->64|95->66|95->66|96->67|98->69|98->69|99->70|100->71|108->79|108->79|110->81
                  -- GENERATED --
              */
          