plugins {
    groovy
    `java-library`
}

dependencies {
    api(project(":ontrack-extension-support"))
    api("org.codehaus.groovy:groovy")
    
    implementation("org.apache.commons:commons-lang3")
    implementation("com.google.guava:guava")
    implementation("org.slf4j:slf4j-api")
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
