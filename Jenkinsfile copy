pipeline{
    agent {
        dockerfile {
            filename 'Dockerfile'
            args "--entrypoint=''"
        }
    }

    stages{
        stage('Version de k6'){
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