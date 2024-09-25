import http from 'k6/http';
import { check } from 'k6';

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// Configurer l'output vers InfluxDB
export const options = {
  influxdb: {
    url: 'http://influxdb:8086', // URL de ton InfluxDB
    token: 'RMZ3_Ox6Fh62W5Ayg9181aXLoM8V8pVuYviqpemIz-JEMpoUj253G3UVZdWYlWYIQlxuqtQ7E8E_3l3YD1D-oA==', // Remplace par ton token
    org: 'InfluxDB', // Remplace par le nom de ton organisation
    bucket: 'InfluxDB', // Remplace par le nom de ton bucket
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
