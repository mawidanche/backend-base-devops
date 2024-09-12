pipeline {
    agent any
    environment {
        USERNAME = 'cmd'
    }
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
                        timeout(time: 20, unit: 'SECONDS') {
                            waitForQualityGate abortPipeline: true
                        }
                    }
                }
            }
        }
        stage('delivery'){
            steps {
                script {
                    docker.withRegistry('http://localhost:8082', 'nexus-key') {
                        sh 'docker build -t backend-base-devops:latest .'
                        sh "docker tag backend-base-devops:latest localhost:8082/backend-base-devops:latest"
                        sh "docker tag backend-base-devops:latest localhost:8082/backend-base-devops:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
                        sh 'docker push localhost:8082/backend-base-devops:latest'
                        sh "docker push localhost:8082/backend-base-devops:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
                    }
                }
            }
        }
        stage('deploy'){
            steps {
                script {
                    sh "kubectl get namespace devops || kubectl create namespace devops"
                    def deploymentExists = sh(script: "kubectl get deployment backend-base-devops-deployment -n devops", returnStatus: true) == 0
                    if (!deploymentExists) {
                        sh "kubectl apply -f kubernetes.yaml -n devops"
                    } 
                    sh "kubectl set image deployment/backend-base-devops-deployment backend-base-devops=localhost:8082/backend-base-devops:${env.BRANCH_NAME}-${env.BUILD_NUMBER} -n devops"

                }
            }
        }
    }
}