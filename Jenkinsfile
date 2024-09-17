pipeline{
    agent {
        docker {
            image 'grafana/k6'
            args "--entrypoint=''"
        }
    }
     parameters {
        string(name: 'VU_COUNT', duration: '10m', target: '10',  description: 'Nombre de VUs (Virtual Users) à simuler')
        string(name: 'MONTEE_STAGE_1',duration: '30m', target: 200, description: 'Monté en charge')
        string(name: 'MAINTIEN_STAGE_2', duration: '5m', target: 200, description: 'stay at higher 200 users for 30 minutes')
        string(name: 'MAINTIEN_STAGE_3', duration: '5m', target: 0, description: 'ramp-down to 0 users')
        choice(name: 'CHOICE', choices: ['script1.js', 'script.js', 'script.js'], description: 'Choisir le script à executé')
    }

    stages{
        stage('Version de k6'){
            steps{
                sh 'k6 -v'
            }
        }

         stage('Run tests'){
            steps{
                sh "k6 run --stage 2m:200 --stage ${params.MONTEE_STAGE_1}:${params.MAINTIEN_STAGE_1} --stage ${params.MAINTIEN_STAGE_2}:${params.MAINTIEN_STAGE_2} --stage ${params.MAINTIEN_STAGE_3}:${params.MAINTIEN_STAGE_3} --vus ${params.VU_COUNT}  ${params.CHOICE}"
            }
        }
    }
}