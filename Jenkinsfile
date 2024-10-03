pipeline{
    agent {
        docker {
            image 'grafana/k6'
            args "--entrypoint=''"
        }
    }
     parameters {
        string(name: 'VU_COUNT', defaultValue: '10',  description: 'Nombre de VUs (Virtual Users) à simuler')
        string(name: 'MONTEE_STAGE_1', defaultValue: '30s', description: 'Monté en charge')
        string(name: 'MAINTIEN_STAGE_2', defaultValue: '200', description: 'stay at higher 200 users for 30 minutes')
        string(name: 'MAINTIEN_STAGE_3', defaultValue: '5s', description: 'ramp-down to 0 users')
         string(name: 'MAINTIEN_STAGE_4', defaultValue: '0', description: 'ramp-down to 0 users')
        choice(name: 'CHOICE', choices: ['script1.js', 'script.js', 'script.js'], description: 'Choisir le script à executé')
    }

    stages{
        stage('Version de k6'){
            steps{
                sh 'k6 version'
            }
        }

         stage('Run tests') {
            steps {
                script {

                    sh 'ls -la'
               def influxdbUrl = "http://influxdb:8086/api/v2/write?org=InfluxDB&bucket=InfluxDB&token=xDfwmeGzNGELGGjpcr_zKh5LNgYbWPeN91UVhat9Uj-XThzRbCaUESw_BBF3cimc8YYtvFK3O7Ydbkju8IONLg=="
                    def stages = "--stage ${params.MONTEE_STAGE_1}:${params.MAINTIEN_STAGE_2} --stage ${params.MAINTIEN_STAGE_3}:${params.MAINTIEN_STAGE_4}"
                    def vusCount = "--vus ${params.VU_COUNT}"

                    // Debug info
                    echo "InfluxDB URL: ${influxdbUrl}"
                    echo "Stages: ${stages}"
                    echo "Vus Count: ${vusCount}"
                    echo "Script Choice: ${params.CHOICE}"

                    // Vérifiez que le script existe
                    sh "ls -la ${params.CHOICE}"

                    sh """
                             k6 run --out influxdb='${influxdbUrl}' ${stages} ${vusCount} '${params.CHOICE}'
                    """
                }
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
