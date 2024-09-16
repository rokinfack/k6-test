pipeline{
    agent {
        docker {
            image 'grafana/k6'
            args "--entrypoint=''"
        }
    }
     parameters {
        string(name: 'VU_COUNT', defaultValue: '10', description: 'Nombre de VUs (Virtual Users) à simuler')
        string(name: 'DURATION', defaultValue: '30s', description: 'Durée du test en secondes ou minutes (ex: 30s, 1m)')
    }

    stages{
        stage('Version de k6'){
            steps{
                sh 'k6 -v'
            }
        }

         stage('Run tests'){
            steps{
                sh "k6 run --vus ${params.VU_COUNT} --duration ${params.DURATION} script.js"
            }
        }
    }
}