import http from 'k6/http';
import { check } from 'k6';

export let options = {
  // Configuration des VUs et de la durée
  vus: 10,
  duration: '30s',
  // Configuration de l'output pour InfluxDB
  influxdb: {
    url: 'http://influxdb:8086/write?db=k6',
  }
};

export default function () {
  let res = http.get('https://test.k6.io');
  check(res, { 'status is 200': (r) => r.status === 200 });
}
