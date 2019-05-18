pipeline {
    agent any
    tools {nodejs "node"}
    environment {
        CI = 'true'
    }
    stages {
        stage('SCM Checkout') {
            steps {
                git 'https://github.com/gabycasper007/megasoftcalulator'
            }
        }
        stage('Build') { 
            steps {
                sh 'npm run mern' 
            }
        }
        stage('Test') {
            steps {
                sh 'CI=true npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t gabriellvasile/calculator:1.0.0 .'
            }
        }
        stage('Push Docker Image') {
            steps {
                withCredentials([string(credentialsId: 'docker-pwd', variable: 'dockerHubPwd')]) {
                    sh "docker login -u gabriellvasile -p ${dockerHubPwd}"
                }
                sh 'docker push gabriellvasile/calculator:1.0.0'
            }
        }
    }
}