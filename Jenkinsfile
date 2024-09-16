pipeline {
    agent {
        docker {
            image 'grafana/k6'
            args "--entrypoint=''"
        }
    }

    environment {
        VU_COUNT = '10'
        DURATION = '30s'
        SCRIPT_PATH = 'script.js'
        INFLUXDB_URL = 'http://localhost:8086'
        INFLUXDB_DB = 'k6'
    }

    stages {
        stage('Run tests') {
            steps {
                script {
                    sh """
                    k6 run --vus ${env.VU_COUNT} --duration ${env.DURATION} \
                    --out influxdb=${env.INFLUXDB_URL}/${env.INFLUXDB_DB} \
                    ${env.SCRIPT_PATH}
                    """
                }
            }
        }

        stage('Verify InfluxDB') {
            steps {
                script {
                    sh """
                    curl -G ${env.INFLUXDB_URL}/query?db=${env.INFLUXDB_DB} --data-urlencode "q=SHOW MEASUREMENTS"
                    """
                }
            }
        }

        stage('Verify Grafana') {
            steps {
                script {
                    sleep 30
                    sh """
                    curl -I http://localhost:3000
                    """
                }
            }
        }
    }

    post {
        always {
            sh 'docker stop influxdb grafana || true'
            sh 'docker rm influxdb grafana || true'
        }
    }
}
