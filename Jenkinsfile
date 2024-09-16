pipeline{
    agent {
        dockerfile {
            filename 'Dockerfile'
            args "--entrypoint=''"
        }
    }

    stages{
        stage('Build de docker'){
            steps{
                sh 'k6 -v'
            }
        }

         stage('Run tests'){
            steps{
                sh 'k6 run script.js'
            }
        }
    }
}