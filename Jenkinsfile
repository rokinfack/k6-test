pipeline {
    agent any

    environment {
        INFLUXDB_CONTAINER = 'influxdb:2.0'
        GRAFANA_CONTAINER = 'grafana/grafana:latest'
        INFLUXDB_HOST = 'localhost'
        INFLUXDB_PORT = '8086'
        GRAFANA_PORT = '3000'
        INFLUXDB_ORG = 'my-org'
        INFLUXDB_BUCKET = 'k6-bucket'
        INFLUXDB_TOKEN = 'your-influxdb-token'
        K6_SCRIPT = '/app/script.js'
        VU_COUNT = '10'
        DURATION = '30s'
    }

    stages {
        stage('Start InfluxDB') {
            steps {
                script {
                    sh '''
                    docker run -d --name influxdb \ 
                    -v influxdb_data:/var/lib/influxdb2 \
                    ${INFLUXDB_CONTAINER}
                    '''
                }
            }
        }

        stage('Start Grafana') {
            steps {
                script {
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
                    sh '''
                    docker run --rm -v $PWD:/app -w /app \
                    ${K6_CONTAINER} run --vus ${VU_COUNT} --duration ${DURATION} ${K6_SCRIPT} \
                    --out influxdb=http://${INFLUXDB_HOST}:${INFLUXDB_PORT}/api/v2/write?org=${INFLUXDB_ORG}&bucket=${INFLUXDB_BUCKET}&precision=s \
                    --header "Authorization: Token ${INFLUXDB_TOKEN}"
                    '''
                }
            }
        }
    }

    post {
        always {
            script {
                // Nettoyage des conteneurs après l'exécution
                sh '''
                docker stop influxdb grafana
                docker rm influxdb grafana
                '''
            }
        }
    }
}
