pipeline {
    agent any

    parameters {
        string(name: 'VU_COUNT', defaultValue: '10', description: 'Nombre de VUs (Virtual Users) à simuler')
        string(name: 'MONTEE_STAGE_1', defaultValue: '30s', description: 'Monté en charge')
        string(name: 'MAINTIEN_STAGE_2', defaultValue: '200', description: 'Stay at higher 200 users for 30 minutes')
        string(name: 'MAINTIEN_STAGE_3', defaultValue: '5s', description: 'Ramp-down to 0 users')
        string(name: 'MAINTIEN_STAGE_4', defaultValue: '0', description: 'Ramp-down to 0 users')
        choice(name: 'CHOICE', choices: ['script1.js', 'script2.js', 'script3.js'], description: 'Choisir le script à exécuter')
    }

    stages {
       stage('Install k6') {
            steps {
                script {
                    // Mettre à jour le système et installer les dépendances nécessaires
                    sh '''
                        apt-get update && apt-get install -y \
                        gnupg2 \
                        curl && \
                        rm -rf /var/lib/apt/lists/*

                        # Ajouter la clé GPG de k6
                        gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg \
                        --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69

                        # Ajouter le dépôt de k6
                        echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" \
                        | tee /etc/apt/sources.list.d/k6.list

                        # Installer k6
                        apt-get update && apt-get install -y k6
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

        stage('Run tests') {
            steps {
                // Exécuter le test k6
                sh "k6 run --out influxdb=http://influxdb:8086/api/v2/write?org=InfluxDB&bucket=InfluxDB&token=RMZ3_Ox6Fh62W5Ayg9181aXLoM8V8pVuYviqpemIz-JEMpoUj253G3UVZdWYlWYIQlxuqtQ7E8E_3l3YD1D-oA== --stage ${params.MONTEE_STAGE_1}:${params.MAINTIEN_STAGE_2} --stage ${params.MAINTIEN_STAGE_3}:${params.MAINTIEN_STAGE_4} --vus ${params.VU_COUNT} ${params.CHOICE}"
            }
        }
    }

    post {
        success {
            echo 'Tests exécutés avec succès.'
            // Ajoutez ici vos étapes pour archiver les rapports, si nécessaire.
        }
        failure {
            echo 'Une erreur est survenue lors de l\'exécution des tests.'
        }
    }
}
