import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

val jar: Jar by tasks
val bootJar: org.springframework.boot.gradle.tasks.bundling.BootJar by tasks

bootJar.enabled = false

plugins {
    id("org.springframework.boot") version "2.7.7"
    id("io.spring.dependency-management") version "1.1.0"
    kotlin("jvm") version "1.7.10"
    kotlin("plugin.spring") version "1.7.10"
}

java.sourceCompatibility = JavaVersion.VERSION_11


subprojects {
    apply {
        plugin("org.jetbrains.kotlin.jvm")
        plugin("io.spring.dependency-management")
        plugin("org.springframework.boot")
    }
    repositories {
        mavenCentral()
    }

    dependencies {
        implementation("org.jetbrains.kotlin:kotlin-reflect")
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
        implementation("io.springfox:springfox-boot-starter:3.0.0")
        implementation("io.springfox:springfox-swagger-ui:3.0.0")
        implementation("com.aallam.openai:openai-client:3.1.0")
        implementation("io.ktor:ktor-client-apache:2.2.4")
        testImplementation("org.springframework.boot:spring-boot-starter-test")

        implementation("commons-io:commons-io:2.11.0")
        implementation("com.amazonaws:aws-java-sdk-s3:1.12.422")
    }

    tasks.withType<KotlinCompile> {
        kotlinOptions {
            freeCompilerArgs = listOf("-Xjsr305=strict")
            jvmTarget = "11"
        }
    }

    tasks.withType<Test> {
        useJUnitPlatform()
    }
}