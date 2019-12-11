import * as tunnel from 'tunnel';

export default {
  databaseURL: 'mongodb://192.168.0.8/nddb',
  api: {
    prefix: '/api'
  },
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },
  http: {
    port: 80
  },
  https: {
    port: 5033
  },
  axios: {
    request: {
      config: {
        httpsAgent:
          process.env.NODE_ENV === 'geodis' &&
          tunnel.httpsOverHttp({
            proxy: {
              host: '10.7.67.100',
              port: 3128
            }
          }),
        headers: {
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36'
        }
      }
    }
  }
};
