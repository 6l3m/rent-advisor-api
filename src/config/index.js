import * as tunnel from 'tunnel';

export default {
  databaseURL: 'mongodb://192.168.0.8/nddb',
  api: {
    prefix: '/api'
  },
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  http: {
    port: 80
  },
  https: {
    port: 5033
  },
  axios: {
    request: {
      config: process.env.NODE_ENV === 'geodis'
        && {
          httpsAgent: tunnel.httpsOverHttp({
            proxy: {
              host: '10.7.67.100',
              port: 3128,
            }
          }),
        }
    }
  }
}
