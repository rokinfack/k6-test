FROM grafana/k6
WORKDIR /usr/src/app
COPY . .
CMD ["k6", "run", "/usr/src/app/script.js"]