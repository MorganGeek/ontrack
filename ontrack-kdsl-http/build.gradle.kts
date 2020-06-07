plugins {
    `java-library`
}

description = "KDSL HTTP-based implementation"

dependencies {
    api(project(":ontrack-kdsl-spec"))
    api(project(":ontrack-kdsl-connector"))
}

val testJar by tasks.registering(Jar::class) {
    archiveClassifier.set("tests")
    from(sourceSets["test"].output)
}

configure<PublishingExtension> {
    publications {
        maybeCreate<MavenPublication>("mavenCustom").artifact(tasks["testJar"])
    }
}

tasks["assemble"].dependsOn("testJar")

val tests by configurations.creating

artifacts {
    add("tests", testJar)
}
