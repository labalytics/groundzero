name := """:Labalytics"""
version := "0.0.0"
lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.8"
incOptions := incOptions.value.withNameHashing(true)
updateOptions := updateOptions.value.withCachedResolution(cachedResoluton = true)

// Added externally
testOptions += Tests.Argument(TestFrameworks.JUnit, "-v", "-q", "-a")
libraryDependencies += "dom4j" % "dom4j" % "1.6.1" intransitive()

libraryDependencies ++= {
  val ngVersion="2.4.7"
  Seq(
    cache,

    //angular2 dependencies
    "org.webjars.npm" % "angular__common" % ngVersion,
    "org.webjars.npm" % "angular__compiler" % ngVersion,
    "org.webjars.npm" % "angular__core" % ngVersion,
    "org.webjars.npm" % "angular__forms" % ngVersion,
    "org.webjars.npm" % "angular__http" % ngVersion,
    "org.webjars.npm" % "angular__platform-browser-dynamic" % ngVersion,
    "org.webjars.npm" % "angular__platform-browser" % ngVersion,
    "org.webjars.npm" % "systemjs" % "0.19.39",
    "org.webjars.npm" % "todomvc-common" % "1.0.2",
    "org.webjars.npm" % "rxjs" % "5.0.0-beta.12",
    "org.webjars.npm" % "es6-promise" % "3.1.2",
    "org.webjars.npm" % "es6-shim" % "0.35.1",
    "org.webjars.npm" % "reflect-metadata" % "0.1.8",
    "org.webjars.npm" % "zone.js" % "0.6.25",
    "org.webjars.npm" % "core-js" % "2.4.1",
    "org.webjars.npm" % "symbol-observable" % "1.0.1",

    "org.webjars.npm" % "typescript" % "2.0.3",

    //tslint dependency
    "org.webjars.npm" % "tslint-eslint-rules" % "2.1.0",
    "org.webjars.npm" % "codelyzer" % "0.0.28",
    "org.webjars.npm" % "types__jasmine" % "2.2.26-alpha" % "test",
    //test
    //  "org.webjars.npm" % "jasmine-core" % "2.4.1"

    // Added externally
    javaJdbc,
    javaJpa,
    "org.mockito" % "mockito-core" % "2.6.8",
    javaWs % "test",
    "org.hibernate" % "hibernate-core" % "5.2.6.Final",
    "org.mindrot" % "jbcrypt" % "0.3m",
    "com.typesafe.play" %% "play-mailer" % "5.0.0",
    javaWs,


  "mysql" % "mysql-connector-java" % "5.1.18"
  )
}
dependencyOverrides += "org.webjars.npm" % "minimatch" % "3.0.0"

// the typescript typing information is by convention in the typings directory
// It provides ES6 implementations. This is required when compiling to ES5.
typingsFile := Some(baseDirectory.value / "typings" / "index.d.ts")

// use the webjars npm directory (target/web/node_modules ) for resolution of module imports of angular2/core etc
resolveFromWebjarsNodeModulesDir := true

// use the combined tslint and eslint rules plus ng2 lint rules
(rulesDirectories in tslint) := Some(List(
  tslintEslintRulesDir.value,
  ng2LintRulesDir.value
))

routesGenerator := InjectedRoutesGenerator


fork in run := true
