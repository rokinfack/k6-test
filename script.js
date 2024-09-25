import http from 'k6/http';
import { check } from 'k6';

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// Configurer l'output vers InfluxDB
export let options = {
    vus: 10, // Exemple : nombre d'utilisateurs virtuels
    duration: '30s', // Exemple : durée du test
    // Configuration d'InfluxDB
    influxdb: {
        address: 'http://influxdb:8086/InfluxDB', // Assurez-vous que l'adresse correspond
    },
};

export function handleSummary(data) {
    return {
        "summary.json": JSON.stringify(data),
        "result.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true })
    };
}

export default function () {
    let res = http.get('https://test.k6.io');
    check(res, { 'status is 200': (r) => r.status === 200 });
}
