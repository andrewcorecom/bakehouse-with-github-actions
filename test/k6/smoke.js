import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  vus: 2,
  duration: '2m',
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1000']
  }
}

export default function () {
  const res = http.get('https://andrew-milne-bakehouse.cta-training.academy/api/healthcheck')

  check(res, {
    'status is 200': (r) => r.status === 200
  })

  sleep(1)
}
