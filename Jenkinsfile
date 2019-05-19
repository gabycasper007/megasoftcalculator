pipeline {
    agent any
    tools {nodejs "node"}
    environment {
        CI = 'true'
        // dockerRun = 'docker-compose up --force-recreate --build -d'
        dockerRun = 'docker-compose pull && docker-compose up --force-recreate --build -d'
        // // // dockerRun = 'docker stop calculator-frontend || true && docker rm -f calculator-frontend || true && docker image rm gabriellvasile/calculator-frontend || true && docker stop calculator-frontend || true && docker rm -f calculator-frontend || true && docker image rm gabriellvasile/calculator-frontend || true'
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
                // docker-compose -f docker-compose.yml up --build
                // docker tag calculator-dt1_backend gabriellvasile/calculator:latest
                // sh 'docker build -t gabriellvasile/calculator:latest .'
                // sh 'docker-compose build'
                // sh 'docker tag calculator-dt1_backend gabriellvasile/calculator:latest'

                sh 'docker build -t gabriellvasile/calculator-frontend:latest ./'
                sh 'docker build -t gabriellvasile/calculator:latest ./server'
            }
        }
        stage('Push Docker Image') {
            steps {
                withCredentials([string(credentialsId: 'docker-pwd', variable: 'dockerHubPwd')]) {
                    sh "docker login -u gabriellvasile -p ${dockerHubPwd}"
                }
                sh 'docker push gabriellvasile/calculator-frontend:latest'
                sh 'docker push gabriellvasile/calculator:latest'
                sh 'docker image rm gabriellvasile/calculator-frontend:latest'
                sh 'docker image rm gabriellvasile/calculator:latest'
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