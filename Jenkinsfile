pipeline {
    agent any

    environment {
       INFLUXDB_CONTAINER = 'influxdb:2.0'
        INFLUXDB_ORG = 'my-org'
        GRAFANA_CONTAINER = 'grafana/grafana:latest'
        K6_CONTAINER = 'grafana/k6'
        INFLUXDB_HOST = 'localhost'
        INFLUXDB_PORT = '8086'
        INFLUXDB_USER = 'admin'
        INFLUXDB_BUCKET = 'k6-bucket'
        INFLUXDB_TOKEN = 'your-influxdb-token'
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
                    -v influxdb_data:/var/lib/influxdb2 \
                    -e DOCKER_INFLUXDB_INIT_MODE=setup \
                    -e DOCKER_INFLUXDB_INIT_USERNAME=${INFLUXDB_USER} \
                    -e DOCKER_INFLUXDB_INIT_PASSWORD=${INFLUXDB_PASSWORD} \
                    -e DOCKER_INFLUXDB_INIT_ORG=${INFLUXDB_ORG} \
                    -e DOCKER_INFLUXDB_INIT_BUCKET=${INFLUXDB_BUCKET} \
                    -e DOCKER_INFLUXDB_INIT_ADMIN_TOKEN=${INFLUXDB_TOKEN} \
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
