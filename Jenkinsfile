pipeline {
    agent any

    parameters {
        string(name: 'MONTEE_STAGE_1', defaultValue: 'stage1', description: 'Stage 1')
        string(name: 'MAINTIEN_STAGE_2', defaultValue: 'stage2', description: 'Stage 2')
        string(name: 'MAINTIEN_STAGE_3', defaultValue: 'stage3', description: 'Stage 3')
        string(name: 'MAINTIEN_STAGE_4', defaultValue: 'stage4', description: 'Stage 4')
        string(name: 'VU_COUNT', defaultValue: '100', description: 'Number of virtual users')
        string(name: 'CHOICE', defaultValue: 'your_test_script.js', description: 'Test script to run')
    }

    stages {
        stage('Version de k6') {
            steps {
                sh 'k6 -v'
            }
        }

        stage('Run tests') {
            steps {
                script {
                    // Vérifier les valeurs des paramètres
                    echo "MONTEE_STAGE_1: ${params.MONTEE_STAGE_1}"
                    echo "MAINTIEN_STAGE_2: ${params.MAINTIEN_STAGE_2}"
                    echo "MAINTIEN_STAGE_3: ${params.MAINTIEN_STAGE_3}"
                    echo "MAINTIEN_STAGE_4: ${params.MAINTIEN_STAGE_4}"
                    echo "VU_COUNT: ${params.VU_COUNT}"
                    echo "CHOICE: ${params.CHOICE}"

                    // Construire l'URL d'InfluxDB
                    def influxdbUrl = "http://influxdb:8086/api/v2/write?org=InfluxDB&bucket=InfluxDB&token=RMZ3_Ox6Fh62W5Ayg9181aXLoM8V8pVuYviqpemIz-JEMpoUj253G3UVZdWYlWYIQlxuqtQ7E8E_3l3YD1D-oA=="

                    // Construire les options de la commande k6
                    def stages = "--stage ${params.MONTEE_STAGE_1}:${params.MAINTIEN_STAGE_2} --stage ${params.MAINTIEN_STAGE_3}:${params.MAINTIEN_STAGE_4}"
                    def vusCount = "--vus ${params.VU_COUNT}"

                    // Exécuter les tests k6
                    sh "k6 run --out influxdb=${influxdbUrl} ${stages} ${vusCount} ${params.CHOICE}"
                }
            }
        }
    }
}
