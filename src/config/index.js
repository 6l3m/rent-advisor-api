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
          common: {
            'User-Agent': 'AdsBot-Google (+http://www.google.com/adsbot.html)'
          }
        }
      }
    }
  }
};
