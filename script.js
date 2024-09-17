import http from 'k6/http';
import { check } from 'k6';

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

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
