pipeline {
    agent any
//    environment {
//
//    }
    options {
        disableConcurrentBuilds()
    }
    stages {
        stage('Build and Test'){
            agent {
                docker {
                    image 'node:20.11.1-alpine3.19'
                    reuseNode true
                }
            }
            stages {
                stage('Instalar dependencias') {
                    steps {
                        sh 'npm install'
                    }
                }
                stage('ejecucion de test') {
                    steps {
                        sh 'npm run test'
                    }
                } 
                stage('ejecucion de build') {
                    steps {
                        sh 'npm run build'
                    }
                }    
            }
        }
        stage('Code Quality'){
            stages {
                stage('SonarQube analysis') {
                    agent {
                        docker {
                            image 'sonarsource/sonar-scanner-cli' 
                            args '--network="devops-infra_default"'
                            reuseNode true
                        }
                    }
                    steps {
                        withSonarQubeEnv('sonarqube') {
                            sh 'sonar-scanner'
                        }
                    }
                }
                stage('Quality Gate') {
                    steps {
                        timeout(time: 10, unit: 'SECONDS') {
                            waitForQualityGate abortPipeline: true
                        }
                    }
                }
            }
        }
        stage('delivery'){
            steps {
                sh 'echo "en construccion ..."'
            }
        }
        stage('deploy'){
            steps {
                sh 'echo "en construccion ..."'
            }
        }
    }
}