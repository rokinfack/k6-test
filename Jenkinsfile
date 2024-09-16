pipeline{
    agent {
        dockerfile {
            filename 'Dockerfile'
        }
    }

    stages{
        stage('Build de docker'){
            steps{
                sh 'docker build . -t docker-k6'
            }
        }

         stage('Run tests'){
            steps{
                sh 'docker run -rm docker-k6 run script.js'
            }
        }
    }
}