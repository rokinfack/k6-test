pipeline{
    agent {
        docker {
            image 'grafana/k6'
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
                sh 'k6 run --vus 10 --duration 30s script.js'
            }
        }
    }
}