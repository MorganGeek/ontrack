@Library("ontrack-jenkins-library@1.0.0") _

pipeline {

    environment {
        ONTRACK_PROJECT_NAME = "ontrack"
        ONTRACK_BRANCH_NAME = ontrackBranchName(BRANCH_NAME)
        DOCKER_REGISTRY_CREDENTIALS = credentials("DOCKER_NEMEROSA")
        CODECOV_TOKEN = credentials("CODECOV_TOKEN")
    }

    agent {
        docker {
            image "nemerosa/ontrack-build:1.0.2"
            reuseNode true
            args "--volume /var/run/docker.sock:/var/run/docker.sock --network host"
        }
    }

    options {
        // General Jenkins job properties
        buildDiscarder(logRotator(numToKeepStr: '40'))
        // Timestamps
        timestamps()
        // No durability
        durabilityHint('PERFORMANCE_OPTIMIZED')
    }

    stages {

        stage('Setup') {
            when {
                not {
                    anyOf {
                        branch 'master'
                        changeRequest()
                    }
                }
            }
            steps {
                echo "Ontrack setup for ${ONTRACK_BRANCH_NAME}"
                ontrackBranchSetup(project: ONTRACK_PROJECT_NAME, branch: ONTRACK_BRANCH_NAME, script: """
                            branch.config {
                                gitBranch '${BRANCH_NAME}', [
                                    buildCommitLink: [
                                        id: 'git-commit-property'
                                    ]
                                ]
                            }
                        """)
            }
        }

        stage('Build') {
            when {
                not {
                    branch 'master'
                }
            }
            steps {
                ansiColor('xterm') {
                    sh ''' git checkout -B ${BRANCH_NAME} && git clean -xfd '''
                    sh ''' ./gradlew clean versionDisplay versionFile'''
                    script {
                        // Reads version information
                        def props = readProperties(file: 'build/version.properties')
                        env.VERSION = props.VERSION_DISPLAY
                        env.GIT_COMMIT = props.VERSION_COMMIT
                        // If not a PR, create a build
                        if (!(BRANCH_NAME ==~ /PR-.*/)) {
                            ontrackBuild(project: ONTRACK_PROJECT_NAME, branch: ONTRACK_BRANCH_NAME, build: VERSION, gitCommit: GIT_COMMIT)
                        }
                    }
                    echo "Version = ${VERSION}"
                    sh '''
                        ./gradlew \\
                            test \\
                            build \\
                            integrationTest \\
                            codeCoverageReport \\
                            publishToMavenLocal \\
                            osPackages \\
                            dockerBuild \\
                            -Pdocumentation \\
                            -PbowerOptions='--allow-root' \\
                            -Dorg.gradle.jvmargs=-Xmx4096m \\
                            --stacktrace \\
                            --parallel \\
                            --console plain
                    '''
                    sh ''' curl -s https://codecov.io/bash | bash -s -- -c -F build'''
                    sh '''
                        echo "(*) Building the test extension..."
                        cd ontrack-extension-test
                        ./gradlew \\
                            clean \\
                            build \\
                            -PontrackVersion=${VERSION} \\
                            -PbowerOptions='--allow-root' \\
                            -Dorg.gradle.jvmargs=-Xmx2048m \\
                            --stacktrace \\
                            --console plain
                    '''
                    echo "Pushing image to registry..."
                    sh '''
                        echo ${DOCKER_REGISTRY_CREDENTIALS_PSW} | docker login docker.nemerosa.net --username ${DOCKER_REGISTRY_CREDENTIALS_USR} --password-stdin
                        
                        docker tag nemerosa/ontrack:${VERSION} docker.nemerosa.net/nemerosa/ontrack:${VERSION}
                        docker tag nemerosa/ontrack-acceptance:${VERSION} docker.nemerosa.net/nemerosa/ontrack-acceptance:${VERSION}
                        docker tag nemerosa/ontrack-extension-test:${VERSION} docker.nemerosa.net/nemerosa/ontrack-extension-test:${VERSION}
                        
                        docker push docker.nemerosa.net/nemerosa/ontrack:${VERSION}
                        docker push docker.nemerosa.net/nemerosa/ontrack-acceptance:${VERSION}
                        docker push docker.nemerosa.net/nemerosa/ontrack-extension-test:${VERSION}
                    '''
                }
            }
            post {
                always {
                    script {
                        def results = junit '**/build/test-results/**/*.xml'
                        // If not a PR, create a build validation stamp
                        if (!(BRANCH_NAME ==~ /PR-.*/)) {
                            ontrackValidate(
                                    project: ONTRACK_PROJECT_NAME,
                                    branch: ONTRACK_BRANCH_NAME,
                                    build: VERSION,
                                    validationStamp: 'BUILD',
                                    testResults: results,
                            )
                        }
                    }
                }
            }
        }

//        stage('Local acceptance tests') {
//            when {
//                beforeAgent true
//                not {
//                    branch 'master'
//                }
//            }
//            environment {
//                ONTRACK_VERSION = "${version}"
//                CODECOV_TOKEN = credentials("CODECOV_TOKEN")
//            }
//            steps {
//                // Runs the acceptance tests
//                timeout(time: 25, unit: 'MINUTES') {
//                    sh """\
//#!/bin/bash
//set -e
//
//echo \${DOCKER_REGISTRY_CREDENTIALS_PSW} | docker login docker.nemerosa.net --username \${DOCKER_REGISTRY_CREDENTIALS_USR} --password-stdin
//
//echo "Launching tests..."
//cd ontrack-acceptance/src/main/compose
//docker-compose --project-name local --file docker-compose.yml --file docker-compose-jacoco.yml up --exit-code-from ontrack_acceptance
//"""
//                }
//            }
//            post {
//                success {
//                    sh '''
//                        #!/bin/bash
//                        set -e
//                        echo "Getting Jacoco coverage"
//                        mkdir -p build/jacoco/
//                        cp ontrack-acceptance/src/main/compose/jacoco/jacoco.exec build/jacoco/acceptance.exec
//                        cp ontrack-acceptance/src/main/compose/jacoco-dsl/jacoco.exec build/jacoco/dsl.exec
//                    '''
//                    // Collection of coverage in Docker
//                    sh '''
//                        ./gradlew \\
//                            codeDockerCoverageReport \\
//                            -PjacocoExecFile=build/jacoco/acceptance.exec \\
//                            -PjacocoReportFile=build/reports/jacoco/acceptance.xml \\
//                            --stacktrace \\
//                            --profile \\
//                            --console plain
//                    '''
//                    // Collection of coverage in DSL
//                    sh '''
//                        ./gradlew \\
//                            codeDockerCoverageReport \\
//                            -PjacocoExecFile=build/jacoco/dsl.exec \\
//                            -PjacocoReportFile=build/reports/jacoco/dsl.xml \\
//                            --stacktrace \\
//                            --profile \\
//                            --console plain
//                    '''
//                    // Upload to Codecov
//                    sh '''
//                        curl -s https://codecov.io/bash | bash -s -- -c -F acceptance -f build/reports/jacoco/acceptance.xml
//                        curl -s https://codecov.io/bash | bash -s -- -c -F dsl -f build/reports/jacoco/dsl.xml
//                    '''
//                }
//                always {
//                    sh '''
//                        #!/bin/bash
//                        set -e
//                        echo "Cleanup..."
//                        rm -rf build/acceptance
//                        mkdir -p build
//                        cp -r ontrack-acceptance/src/main/compose/build build/acceptance
//                        cd ontrack-acceptance/src/main/compose
//                        docker-compose --project-name local --file docker-compose.yml --file docker-compose-jacoco.yml down --volumes
//                    '''
//                    script {
//                        def results = junit('build/acceptance/*.xml')
//                        if (!pr) {
//                            ontrackValidate(
//                                    project: projectName,
//                                    branch: branchName,
//                                    build: version,
//                                    validationStamp: 'ACCEPTANCE',
//                                    testResults: results,
//                            )
//                        }
//                    }
//                }
//            }
//        }
//
//        stage('Local extension tests') {
//            when {
//                not {
//                    branch "master"
//                }
//                beforeAgent true
//            }
//            environment {
//                ONTRACK_VERSION = "${version}"
//                CODECOV_TOKEN = credentials("CODECOV_TOKEN")
//            }
//            steps {
//                timeout(time: 25, unit: 'MINUTES') {
//                    // Cleanup
//                    sh """\
//rm -rf ontrack-acceptance/src/main/compose/build
//"""
//                    // Launches the tests
//                    sh """\
//#!/bin/bash
//set -e
//
//echo \${DOCKER_REGISTRY_CREDENTIALS_PSW} | docker login docker.nemerosa.net --username \${DOCKER_REGISTRY_CREDENTIALS_USR} --password-stdin
//
//echo "Launching tests..."
//cd ontrack-acceptance/src/main/compose
//docker-compose --project-name ext --file docker-compose-ext.yml --file docker-compose-jacoco.yml up --exit-code-from ontrack_acceptance
//"""
//                }
//            }
//            post {
//                success {
//                    sh '''
//                        #!/bin/bash
//                        set -e
//                        echo "Getting Jacoco coverage"
//                        mkdir -p build/jacoco/
//                        cp ontrack-acceptance/src/main/compose/jacoco/jacoco.exec build/jacoco/extension.exec
//                    '''
//                    // Collection of coverage in Docker
//                    sh '''
//                        ./gradlew \\
//                            codeDockerCoverageReport \\
//                            -PjacocoExecFile=build/jacoco/extension.exec \\
//                            -PjacocoReportFile=build/reports/jacoco/extension.xml \\
//                            --stacktrace \\
//                            --profile \\
//                            --console plain
//                    '''
//                    // Upload to Codecov
//                    sh '''
//                        curl -s https://codecov.io/bash | bash -s -- -c -F extension -f build/reports/jacoco/extension.xml
//                    '''
//                }
//                always {
//                    sh """\
//echo "Cleanup..."
//mkdir -p build
//rm -rf build/extension
//cp -r ontrack-acceptance/src/main/compose/build build/extension
//cd ontrack-acceptance/src/main/compose
//docker-compose --project-name ext --file docker-compose-ext.yml --file docker-compose-jacoco.yml down --volumes
//"""
//                    script {
//                        def results = junit 'build/extension/*.xml'
//                        ontrackValidate(
//                                project: projectName,
//                                branch: branchName,
//                                build: version,
//                                validationStamp: 'EXTENSIONS',
//                                testResults: results,
//                        )
//                    }
//                }
//            }
//        }
//
//
//        // We stop here for pull requests and feature branches
//
//        // OS tests + DO tests in parallel
//
//        stage('Platform tests') {
//            environment {
//                ONTRACK_VERSION = "${version}"
//            }
//            when {
//                beforeAgent true
//                branch 'release/*'
//            }
//            stages {
//                // CentOS7
//                stage('CentOS7') {
//                    steps {
//                        timeout(time: 25, unit: 'MINUTES') {
//                            sh """\
//#!/bin/bash
//set -e
//
//echo \${DOCKER_REGISTRY_CREDENTIALS_PSW} | docker login docker.nemerosa.net --username \${DOCKER_REGISTRY_CREDENTIALS_USR} --password-stdin
//
//echo "Preparing environment..."
//DOCKER_DIR=ontrack-acceptance/src/main/compose/os/centos/7/docker
//rm -f \${DOCKER_DIR}/*.rpm
//cp build/distributions/*rpm \${DOCKER_DIR}/ontrack.rpm
//
//echo "Launching test environment..."
//cd ontrack-acceptance/src/main/compose
//docker-compose --project-name centos --file docker-compose-centos-7.yml up --build -d ontrack
//
//echo "Launching Ontrack in CentOS environment..."
//CONTAINER=`docker-compose --project-name centos --file docker-compose-centos-7.yml ps -q ontrack`
//echo "... for container \${CONTAINER}"
//docker container exec \${CONTAINER} /etc/init.d/ontrack start
//
//echo "Launching tests..."
//docker-compose --project-name centos --file docker-compose-centos-7.yml up --exit-code-from ontrack_acceptance ontrack_acceptance
//"""
//                        }
//                    }
//                    post {
//                        always {
//                            sh """\
//#!/bin/bash
//set -e
//echo "Cleanup..."
//mkdir -p build
//cp -r ontrack-acceptance/src/main/compose/build build/centos
//cd ontrack-acceptance/src/main/compose
//docker-compose --project-name centos --file docker-compose-centos-7.yml down --volumes
//"""
//                            script {
//                                def results = junit 'build/centos/*.xml'
//                                ontrackValidate(
//                                        project: projectName,
//                                        branch: branchName,
//                                        build: version,
//                                        validationStamp: 'ACCEPTANCE.CENTOS.7',
//                                        testResults: results,
//                                )
//                            }
//                        }
//                    }
//                }
//                // Debian
//                stage('Debian') {
//                    steps {
//                        timeout(time: 25, unit: 'MINUTES') {
//                            sh """\
//#!/bin/bash
//set -e
//
//echo \${DOCKER_REGISTRY_CREDENTIALS_PSW} | docker login docker.nemerosa.net --username \${DOCKER_REGISTRY_CREDENTIALS_USR} --password-stdin
//
//echo "Preparing environment..."
//DOCKER_DIR=ontrack-acceptance/src/main/compose/os/debian/docker
//rm -f \${DOCKER_DIR}/*.deb
//cp build/distributions/*.deb \${DOCKER_DIR}/ontrack.deb
//
//echo "Launching test environment..."
//cd ontrack-acceptance/src/main/compose
//docker-compose --project-name debian --file docker-compose-debian.yml up --build -d ontrack
//
//echo "Launching Ontrack in Debian environment..."
//CONTAINER=`docker-compose --project-name debian --file docker-compose-debian.yml ps -q ontrack`
//echo "... for container \${CONTAINER}"
//docker container exec \${CONTAINER} /etc/init.d/ontrack start
//
//echo "Launching tests..."
//docker-compose --project-name debian --file docker-compose-debian.yml up --build --exit-code-from ontrack_acceptance ontrack_acceptance
//"""
//                        }
//                    }
//                    post {
//                        always {
//                            sh """\
//#!/bin/bash
//set -e
//echo "Cleanup..."
//mkdir -p build/debian
//cp -r ontrack-acceptance/src/main/compose/build/* build/debian/
//cd ontrack-acceptance/src/main/compose
//docker-compose --project-name debian --file docker-compose-debian.yml down --volumes
//"""
//                            script {
//                                def results = junit 'build/debian/*.xml'
//                                ontrackValidate(
//                                        project: projectName,
//                                        branch: branchName,
//                                        build: version,
//                                        validationStamp: 'ACCEPTANCE.DEBIAN',
//                                        testResults: results,
//                                )
//                            }
//                        }
//                    }
//                }
//            }
//        }

        // Publication

        stage('Publication') {
            when {
                anyOf {
                    branch 'release/*'
                    // FIXME
                    branch 'feature/732-bintray'
                }
            }
            stages {
                stage('Docker Hub') {
                    environment {
                        DOCKER_HUB = credentials("DOCKER_HUB")
                    }
                    steps {
                        echo "Docker push"
                        ansiColor('xterm') {
                            sh '''
                                echo ${DOCKER_HUB_PSW} | docker login --username ${DOCKER_HUB_USR} --password-stdin
                                docker image tag docker.nemerosa.net/nemerosa/ontrack:${VERSION} nemerosa/ontrack:${VERSION}
                                docker image push nemerosa/ontrack:${VERSION}
                            '''
                        }
                    }
                    post {
                        always {
                            ontrackValidate(
                                    project: ONTRACK_PROJECT_NAME,
                                    branch: ONTRACK_BRANCH_NAME,
                                    build: VERSION,
                                    validationStamp: 'DOCKER.HUB'
                            )
                        }
                    }
                }
                stage('Bintray publication') {
                    environment {
                        OSSRH = credentials("OSSRH")
                        BINTRAY = credentials("BINTRAY")
                    }
                    steps {
                        sh '''
                            ./gradlew \\
                                bintrayUpload \\
                                -PbintrayUser=${BINTRAY_USR} \\
                                -PbintrayKey=${BINTRAY_PSW} \\
                                -PossrhPublication=true \\
                                -PossrhUser=${OSSRH_USR} \\
                                -PossrhPassword=${OSSRH_PSW} \\
                                --info \\
                                --console plain \\
                                --stacktrace
                        '''
                    }
                    post {
                        always {
                            ontrackValidate(
                                    project: ONTRACK_PROJECT_NAME,
                                    branch: ONTRACK_BRANCH_NAME,
                                    build: VERSION,
                                    validationStamp: 'MAVEN.CENTRAL'
                            )
                        }
                    }
                }
            }
        }

//        // Release
//
//        stage('Release') {
//            environment {
//                ONTRACK_VERSION = "${version}"
//                ONTRACK_COMMIT = "${gitCommit}"
//                ONTRACK_BRANCH = "${branchName}"
//                GITHUB = credentials("GITHUB_NEMEROSA_JENKINS2")
//            }
//            when {
//                beforeAgent true
//                branch 'release/*'
//            }
//            steps {
//                echo "Release"
//
//                unstash name: "delivery"
//                unstash name: "rpm"
//                unstash name: "debian"
//                unzip zipFile: "build/distributions/ontrack-${ONTRACK_VERSION}-delivery.zip", dir: "${WORKSPACE}"
//                unzip zipFile: "${WORKSPACE}/ontrack-publication.zip", dir: "publication"
//
//                sh '''\
//#!/bin/bash
//set -e
//
//./gradlew \\
//    --build-file publication.gradle \\
//    --info \\
//    --profile \\
//    --console plain \\
//    --stacktrace \\
//    -PontrackVersion=${ONTRACK_VERSION} \\
//    -PontrackVersionCommit=${ONTRACK_COMMIT} \\
//    -PontrackReleaseBranch=${ONTRACK_BRANCH} \\
//    -PgitHubUser=${GITHUB_USR} \\
//    -PgitHubPassword=${GITHUB_PSW} \\
//    publicationRelease
//'''
//
//            }
//            post {
//                always {
//                    ontrackValidate(
//                            project: projectName,
//                            branch: branchName,
//                            build: version,
//                            validationStamp: 'GITHUB.RELEASE',
//                    )
//                }
//                success {
//                    ontrackPromote(
//                            project: projectName,
//                            branch: branchName,
//                            build: version,
//                            promotionLevel: 'RELEASE',
//                    )
//                }
//            }
//        }
//
//        // Documentation
//
//        stage('Documentation') {
//            environment {
//                ONTRACK_VERSION = "${version}"
//                AMS3_DELIVERY = credentials("AMS3_DELIVERY")
//            }
//            when {
//                beforeAgent true
//                anyOf {
//                    branch 'release/*'
//                    branch 'develop'
//                }
//            }
//            steps {
//                unstash name: "site"
//
//                script {
//                    if (BRANCH_NAME == 'develop') {
//                        env.DOC_DIR = 'develop'
//                    } else {
//                        env.DOC_DIR = env.ONTRACK_VERSION
//                    }
//                }
//
//                sh '''
//                    s3cmd \\
//                        --access_key=${AMS3_DELIVERY_USR} \\
//                        --secret_key=${AMS3_DELIVERY_PSW} \\
//                        --host=ams3.digitaloceanspaces.com \\
//                        --host-bucket='%(bucket)s.ams3.digitaloceanspaces.com' \\
//                        put \\
//                        build/site/release/* \\
//                        s3://ams3-delivery-space/ontrack/release/${DOC_DIR}/docs/ \\
//                        --acl-public \\
//                        --add-header=Cache-Control:max-age=86400 \\
//                        --recursive
//                '''
//
//            }
//            post {
//                always {
//                    ontrackValidate(
//                            project: projectName,
//                            branch: branchName,
//                            build: version,
//                            validationStamp: 'DOCUMENTATION',
//                    )
//                }
//            }
//        }
//
//        // Master setup
//
//        stage('Master setup') {
//            when {
//                beforeAgent true
//                branch 'master'
//            }
//            steps {
//                script {
//                    // Gets the latest tag
//                    env.ONTRACK_VERSION = sh(
//                            returnStdout: true,
//                            script: 'git describe --tags --abbrev=0'
//                    ).trim()
//                    // Trace
//                    echo "ONTRACK_VERSION=${env.ONTRACK_VERSION}"
//                    // Version components
//                    env.ONTRACK_VERSION_MAJOR_MINOR = extractFromVersion(env.ONTRACK_VERSION as String, /(^\d+\.\d+)\.\d.*/)
//                    env.ONTRACK_VERSION_MAJOR = extractFromVersion(env.ONTRACK_VERSION as String, /(^\d+)\.\d+\.\d.*/)
//                    echo "ONTRACK_VERSION_MAJOR_MINOR=${env.ONTRACK_VERSION_MAJOR_MINOR}"
//                    echo "ONTRACK_VERSION_MAJOR=${env.ONTRACK_VERSION_MAJOR}"
//                    // Gets the corresponding branch
//                    def result = ontrackGraphQL(
//                            script: '''
//                                query BranchLookup($project: String!, $build: String!) {
//                                  builds(project: $project, buildProjectFilter: {buildExactMatch: true, buildName: $build}) {
//                                    branch {
//                                      name
//                                    }
//                                  }
//                                }
//                            ''',
//                            bindings: [
//                                    'project': projectName,
//                                    'build'  : env.ONTRACK_VERSION as String
//                            ],
//                    )
//                    env.ONTRACK_BRANCH_NAME = result.data.builds.first().branch.name as String
//                    // Trace
//                    echo "ONTRACK_BRANCH_NAME=${env.ONTRACK_BRANCH_NAME}"
//                }
//            }
//        }
//
//        // Latest documentation
//
//        stage('Latest documentation') {
//            when {
//                beforeAgent true
//                branch 'master'
//            }
//            environment {
//                AMS3_DELIVERY = credentials("AMS3_DELIVERY")
//            }
//            steps {
//                sh '''
//                    s3cmd \\
//                        --access_key=${AMS3_DELIVERY_USR} \\
//                        --secret_key=${AMS3_DELIVERY_PSW} \\
//                        --host=ams3.digitaloceanspaces.com \\
//                        --host-bucket='%(bucket)s.ams3.digitaloceanspaces.com' \\
//                        --recursive \\
//                        --force \\
//                        cp \\
//                        s3://ams3-delivery-space/ontrack/release/${ONTRACK_VERSION}/docs/ \\
//                        s3://ams3-delivery-space/ontrack/release/latest/docs/
//                '''
//            }
//            post {
//                always {
//                    ontrackValidate(
//                            project: projectName,
//                            branch: env.ONTRACK_BRANCH_NAME as String,
//                            build: env.ONTRACK_VERSION as String,
//                            validationStamp: 'DOCUMENTATION.LATEST',
//                    )
//                }
//            }
//        }
//
//        // Docker latest images
//
//        stage('Docker Latest') {
//            when {
//                branch "master"
//            }
//            environment {
//                DOCKER_HUB = credentials("DOCKER_HUB")
//            }
//            steps {
//                sh '''\
//                    echo "Making sure the images are available on this node..."
//
//                    echo ${DOCKER_REGISTRY_CREDENTIALS_PSW} | docker login docker.nemerosa.net --username ${DOCKER_REGISTRY_CREDENTIALS_USR} --password-stdin
//                    docker image pull docker.nemerosa.net/nemerosa/ontrack:${ONTRACK_VERSION}
//
//                    echo "Tagging..."
//
//                    docker image tag docker.nemerosa.net/nemerosa/ontrack:${ONTRACK_VERSION} nemerosa/ontrack:${ONTRACK_VERSION_MAJOR_MINOR}
//                    docker image tag docker.nemerosa.net/nemerosa/ontrack:${ONTRACK_VERSION} nemerosa/ontrack:${ONTRACK_VERSION_MAJOR}
//
//                    echo "Publishing latest versions in Docker Hub..."
//
//                    echo ${DOCKER_HUB_PSW} | docker login --username ${DOCKER_HUB_USR} --password-stdin
//
//                    docker image push nemerosa/ontrack:${ONTRACK_VERSION_MAJOR_MINOR}
//                    docker image push nemerosa/ontrack:${ONTRACK_VERSION_MAJOR}
//                '''
//            }
//            post {
//                always {
//                    ontrackValidate(
//                            project: projectName,
//                            branch: env.ONTRACK_BRANCH_NAME as String,
//                            build: env.ONTRACK_VERSION as String,
//                            validationStamp: 'DOCKER.LATEST',
//                    )
//                }
//            }
//        }
//
//        // Site generation
//
//        stage('Site generation') {
//            environment {
//                // GitHub OAuth token
//                GRGIT_USER = credentials("JENKINS_GITHUB_TOKEN")
//                GITHUB_URI = 'https://github.com/nemerosa/ontrack.git'
//            }
//            when {
//                beforeAgent true
//                branch 'master'
//            }
//            steps {
//                echo "Getting list of releases and publishing the site..."
//                sh '''\
//                    ./gradlew \\
//                        --info \\
//                        --profile \\
//                        --console plain \\
//                        --stacktrace \\
//                        -PontrackVersion=${ONTRACK_VERSION} \\
//                        -PontrackGitHubUri=${GITHUB_URI} \\
//                        site
//                '''
//            }
//            post {
//                always {
//                    ontrackValidate(
//                            project: projectName,
//                            branch: env.ONTRACK_BRANCH_NAME as String,
//                            build: env.ONTRACK_VERSION as String,
//                            validationStamp: 'SITE',
//                    )
//                }
//            }
//        }
//
//        // Production
//
//        stage('Production') {
//            when {
//                beforeAgent true
//                branch "master"
//            }
//            environment {
//                ONTRACK_POSTGRES = credentials('ONTRACK_POSTGRES')
//            }
//            steps {
//                echo "Deploying ${ONTRACK_VERSION} from branch ${ONTRACK_BRANCH_NAME} in production"
//                // Running the deployment
//                timeout(time: 15, unit: 'MINUTES') {
//                    script {
//                        sshagent(credentials: ['ONTRACK_SSH_KEY']) {
//                            sh '''\
//#!/bin/bash
//
//set -e
//
//SSH_OPTIONS=StrictHostKeyChecking=no
//
//SSH_HOST=${ONTRACK_IP}
//
//scp -o ${SSH_OPTIONS} compose/docker-compose-prod.yml root@${SSH_HOST}:/root
//ssh -o ${SSH_OPTIONS} root@${SSH_HOST} "ONTRACK_VERSION=${ONTRACK_VERSION}" "ONTRACK_POSTGRES_USER=${ONTRACK_POSTGRES_USR}" "ONTRACK_POSTGRES_PASSWORD=${ONTRACK_POSTGRES_PSW}" docker-compose --project-name prod --file /root/docker-compose-prod.yml up -d
//
//'''
//                        }
//                    }
//                }
//            }
//        }
//
//        // Production tests
//
//        stage('Production tests') {
//            when {
//                beforeAgent true
//                branch "master"
//            }
//            environment {
//                ONTRACK_ACCEPTANCE_ADMIN = credentials("ONTRACK_ACCEPTANCE_ADMIN")
//            }
//            steps {
//                timeout(time: 30, unit: 'MINUTES') {
//                    sh '''\
//#!/bin/bash
//set -e
//
//echo ${DOCKER_REGISTRY_CREDENTIALS_PSW} | docker login docker.nemerosa.net --username ${DOCKER_REGISTRY_CREDENTIALS_USR} --password-stdin
//
//echo "(*) Launching the tests..."
//docker-compose \\
//    --file ontrack-acceptance/src/main/compose/docker-compose-prod-client.yml \\
//    --project-name production \\
//    up --exit-code-from ontrack_acceptance
//'''
//                }
//            }
//            post {
//                always {
//                    sh '''\
//#!/bin/bash
//
//echo "(*) Copying the test results..."
//mkdir -p build
//cp -r ontrack-acceptance/src/main/compose/build build/production
//
//echo "(*) Removing the test environment..."
//docker-compose \\
//    --file ontrack-acceptance/src/main/compose/docker-compose-prod-client.yml \\
//    --project-name production \\
//    down
//
//'''
//                    archiveArtifacts 'build/production/**'
//                    script {
//                        def results = junit 'build/production/*.xml'
//                        ontrackValidate(
//                                project: projectName,
//                                branch: env.ONTRACK_BRANCH_NAME as String,
//                                build: env.ONTRACK_VERSION as String,
//                                validationStamp: 'ONTRACK.SMOKE',
//                                testResults: results,
//                        )
//                    }
//                }
//                success {
//                    ontrackPromote(
//                            project: projectName,
//                            branch: env.ONTRACK_BRANCH_NAME as String,
//                            build: env.ONTRACK_VERSION as String,
//                            promotionLevel: 'ONTRACK',
//                    )
//                }
//            }
//        }

    }

}

//@SuppressWarnings("GrMethodMayBeStatic")
//@NonCPS
//String extractFromVersion(String version, String pattern) {
//    def matcher = (version =~ pattern)
//    if (matcher.matches()) {
//        return matcher.group(1)
//    } else {
//        throw new IllegalAccessException("Version $version does not match pattern: $pattern")
//    }
//}
