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
        SCRIPT_PATH = '/app/k6-script.js'
        INFLUXDB_URL = 'http://influxdb:8086'
        INFLUXDB_DB = 'k6'
        INFLUXDB_USER = 'admin'
        INFLUXDB_PASSWORD = 'admin'
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
                    // Exécuter k6 et envoyer les résultats à InfluxDB
                    sh """
                    k6 run --vus ${env.VU_COUNT} --duration ${env.DURATION} \
                    --out influxdb=http://influxdb:8086/k6 \
                    ${env.SCRIPT_PATH}
                    """
                }
            }
        }

        stage('Configure Grafana') {
            steps {
                script {
                    // Attendre que Grafana soit prêt à accepter les connexions
                    sleep 30

                    // Importer un dashboard Grafana via un script
                    // Remplacer les URL et les paramètres selon votre configuration
                    sh """
                    curl -X POST -H "Content-Type: application/json" \
                    -d '{
                        "dashboard": {
                            "id": null,
                            "uid": null,
                            "title": "K6 Dashboard",
                            "tags": [],
                            "timezone": "browser",
                            "schemaVersion": 16,
                            "version": 0,
                            "refresh": "5s",
                            "panels": [
                                {
                                    "type": "graph",
                                    "title": "K6 Request Duration",
                                    "targets": [
                                        {
                                            "target": "aliasByNode(influxdb_measurement, 1)"
                                        }
                                    ],
                                    "xaxis": {
                                        "mode": "time",
                                        "name": null,
                                        "show": true
                                    },
                                    "yaxes": [
                                        {
                                            "format": "short",
                                            "label": null,
                                            "logBase": 1,
                                            "max": null,
                                            "min": null,
                                            "show": true
                                        },
                                        {
                                            "format": "short",
                                            "label": null,
                                            "logBase": 1,
                                            "max": null,
                                            "min": null,
                                            "show": true
                                        }
                                    ]
                                }
                            ]
                        },
                        "folderId": 0,
                        "overwrite": false
                    }' \
                    http://admin:admin@localhost:3000/api/dashboards/db
                    """
                }
            }
        }
    }

    post {
        always {
            // Nettoyer les conteneurs Docker à la fin du build
            sh 'docker stop influxdb grafana || true'
            sh 'docker rm influxdb grafana || true'
        }
    }
}
