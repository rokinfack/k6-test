pipeline{
    agent {
        docker {
            image 'grafana/k6'
            args "--entrypoint=''"
        }
    }
     parameters {
        string(name: 'VU_COUNT',  duration: '10m', target: 200,  description: 'Nombre de VUs (Virtual Users) à simuler')
        string(name: 'DURATION', duration: '30m', target: 200, description: 'Durée du test en secondes ou minutes (ex: 30s, 1m)')
        string(name: 'DURATION', duration: '5m', target: 0 , description: 'Durée du test en secondes ou minutes (ex: 30s, 1m)')
    }

    stages{
        stage('Version de k6'){
            steps{
                sh 'k6 -v'
            }
        }

         stage('Run tests'){
            steps{
                sh "k6 run --stage 2m:200 --stage ${params.duration}:${params.target} --stage 30s:0 --vus ${params.VU_COUNT}  script.js"
            }
        }
    }
}