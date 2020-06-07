plugins {
    `java-library`
}

description = "KDSL Connector"

dependencies {
    api("com.fasterxml.jackson.core:jackson-databind")

    implementation("org.springframework:spring-web")
    implementation("org.springframework.boot:spring-boot")
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
