pipeline{
   agent {
        docker {
            image 'grafana/k6' // Utiliser l'image Docker de k6
            args '--entrypoint=""'
        }
    }

     parameters {
        string(name: 'VU_COUNT', defaultValue: '10',  description: 'Nombre de VUs (Virtual Users) à simuler')
        string(name: 'MONTEE_STAGE_1', defaultValue: '30s', description: 'Monté en charge')
        string(name: 'MAINTIEN_STAGE_2', defaultValue: '200', description: 'stay at higher 200 users for 30 minutes')
        string(name: 'MAINTIEN_STAGE_3', defaultValue: '5s', description: 'ramp-down to 0 users')
         string(name: 'MAINTIEN_STAGE_4', defaultValue: '0', description: 'ramp-down to 0 users')
        choice(name: 'CHOICE', choices: ['script.js', 'script.js', 'script.js'], description: 'Choisir le script à executé')
    }

    stages{
       stage('Install k6') {
            steps {
                script {
                    // Mettre à jour le système et installer k6
                    sh '''
                        sudo apt-get update
                        sudo apt-get install -y k6
                    '''
                }
            }
        }

        stage('Verify Installation') {
            steps {
                // Vérifier l'installation
                sh 'k6 version'
            }
        }

         stage('Run tests'){
            steps{
                sh "k6 run  ${params.MONTEE_STAGE_1}:${params.MAINTIEN_STAGE_2}  --stage ${params.MAINTIEN_STAGE_3}:${params.MAINTIEN_STAGE_4} --vus ${params.VU_COUNT}  ${params.CHOICE}"
            }
        }
    }
    // post {
    //     // always {
    //     //     // Archiver les rapports générés
    //     //     archiveArtifacts artifacts: 'result.html', allowEmptyArchive: true

    //     //     // Publier le rapport HTML
    //     //     publishHTML(target: [
    //     //         allowMissing: false,
    //     //         alwaysLinkToLastBuild: true,
    //     //         keepAll: true,
    //     //         reportDir: '/',
    //     //         reportFiles: 'result.html',
    //     //         reportName: 'My Reports',
    //     //         reportTitles: 'The Report'
    //     //     ])

    //     //     junit "result.html"
    //     // }

    // }
}
