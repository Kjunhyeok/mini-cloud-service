import com.moowork.gradle.node.npm.NpmTask

plugins {
    id("com.github.node-gradle.node") version "2.2.4"
}

group = "com.kjh.webbuilder"
version = "0.0.1-SNAPSHOT"

dependencies {
    api("org.springframework.boot:spring-boot-starter-web")
    api("commons-fileupload:commons-fileupload:1.4")
    api("com.amazonaws:aws-java-sdk-translate:1.12.422")
}

node{
    version = "18.8.0"
    distBaseUrl = "https://nodejs.org/dist"

    download = System.getenv("REQUIRE_NODE_INSTALL") != null && System.getenv("REQUIRE_NODE_INSTALL") == "TRUE"

    workDir = file("${project.buildDir}/nodejs")
    yarnWorkDir = file("${project.buildDir}/yarn")
    nodeModulesDir = file("${project.projectDir}")
    npmWorkDir = file("${project.buildDir}/npm")
}

val installDependencies by tasks.registering(NpmTask::class) {
    setArgs(listOf("install"))
    print("install")
    setExecOverrides(closureOf<ExecSpec> {
        setWorkingDir("${project.projectDir}/front")
    })
}

val buildReactTask by tasks.registering(NpmTask::class) {
    dependsOn(installDependencies)
    print("build")
    setArgs(listOf("run", "build"))
    setExecOverrides(closureOf<ExecSpec> {
        setWorkingDir("${project.projectDir}/front")
    })
}

val copyTask by tasks.registering(Copy::class) {
    dependsOn(buildReactTask)
    print("copy")
    from(file("${project.projectDir}/front/build"))
    into(file("${project.projectDir}/src/main/resources/react"))
}
