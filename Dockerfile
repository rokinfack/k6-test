FROM grafana/k6
WORKDIR /usr/src/app
# Copier le fichier de script dans le conteneur
COPY script.js .

# Rendre le script exécutable
RUN chmod +x script.js
COPY . .
CMD ["k6", "run", "/usr/src/app/script.js"]