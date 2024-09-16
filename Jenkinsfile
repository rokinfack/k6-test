pipeline {
    agent any

    environment {
        INFLUXDB_CONTAINER = 'influxdb:latest'
        GRAFANA_CONTAINER = 'grafana/grafana:latest'
        K6_CONTAINER = 'grafana/k6'
        INFLUXDB_HOST = 'localhost'
        INFLUXDB_PORT = '8086'
        INFLUXDB_USER = 'admin'
        INFLUXDB_PASSWORD = 'admin123'
        K6_SCRIPT = '/app/script.js'
        VU_COUNT = '10' // Nombre d'utilisateurs virtuels
        DURATION = '30s' // Durée du test
    }

    stages {
        stage('Start InfluxDB') {
            steps {
                script {
                    // Lancer InfluxDB pour collecter les métriques
                    sh '''
                    docker run -d --name influxdb \
                    -p 8086:8086 \
                    -e INFLUXDB_DB=${INFLUXDB_DB} \
                    -e INFLUXDB_ADMIN_USER=${INFLUXDB_USER} \
                    -e INFLUXDB_ADMIN_PASSWORD=${INFLUXDB_PASSWORD} \
                    -v influxdb_data:/var/lib/influxdb \
                    ${INFLUXDB_CONTAINER}
                    '''
                }
            }
        }

        stage('Start Grafana') {
            steps {
                script {
                    // Lancer Grafana pour visualiser les métriques
                    sh '''
                    docker run -d --name grafana \
                    -p 3000:3000 \
                    -e GF_SECURITY_ADMIN_USER=admin \
                    -e GF_SECURITY_ADMIN_PASSWORD=admin123 \
                    -v grafana_data:/var/lib/grafana \
                    ${GRAFANA_CONTAINER}
                    '''
                }
            }
        }

        stage('Run K6 tests and send results to InfluxDB') {
            steps {
                script {
                    // Exécuter K6 et envoyer les résultats à InfluxDB
                    sh '''
                    docker run --rm -v $PWD:/app -w /app \
                    ${K6_CONTAINER} run --vus ${VU_COUNT} --duration ${DURATION} ${K6_SCRIPT} \
                    --out influxdb=http://${INFLUXDB_HOST}:${INFLUXDB_PORT}/write?db=${INFLUXDB_DB}
                    '''
                }
            }
        }
    }

    post {
        always {
            script {
                // Nettoyer les conteneurs après exécution
                sh '''
                docker stop influxdb grafana
                docker rm influxdb grafana
                '''
            }
        }
    }
}
