
// @GENERATOR:play-routes-compiler
// @SOURCE:C:/Users/Mahesh/Documents/Project/SEP/Labalytics/conf/routes
// @DATE:Mon Feb 13 23:21:19 CST 2017


package router {
  object RoutesPrefix {
    private var _prefix: String = "/"
    def setPrefix(p: String): Unit = {
      _prefix = p
    }
    def prefix: String = _prefix
    val byNamePrefix: Function0[String] = { () => prefix }
  }
}
