pipeline {
    agent any
    tools {nodejs "node"}
    environment {
        CI = 'true'
        dockerRun = 'docker stop calculator || true && docker rm calculator || true && docker run -p 8090:8090 -d --name calculator gabriellvasile/calculator'
    }
    stages {
        stage('SCM Checkout') {
            steps {
                git 'https://github.com/gabycasper007/megasoftcalculator'
            }
        }
        stage('Install') { 
            steps {
                sh 'npm run mern' 
            }
        }
        stage('Test') {
            steps {
                sh "CI=${CI} npm test"
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build --prod'
                sh 'rm -rf src'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t gabriellvasile/calculator:latest .'
            }
        }
        stage('Push Docker Image') {
            steps {
                withCredentials([string(credentialsId: 'docker-pwd', variable: 'dockerHubPwd')]) {
                    sh "docker login -u gabriellvasile -p ${dockerHubPwd}"
                }
                sh 'docker push gabriellvasile/calculator:latest'
            }
        }
        stage('Run Container on Dev Server') {
          steps {
            sshagent(['prod-server']) {
              sh "ssh -o StrictHostKeyChecking=no ubuntu@172.31.17.152 ${dockerRun}"
            }
          }
        }
    }
}