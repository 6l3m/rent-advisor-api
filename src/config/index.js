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
          authority: 'www.seloger.com',
          'cache-control': 'max-age=0',
          'upgrade-insecure-requests': '1',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
          'sec-fetch-dest': 'document',
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'sec-fetch-site': 'none',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-user': '?1',
          'accept-language': 'en-US,en;q=0.9',
          cookie:
            '__uzma=53adb3a4-520c-18ac-5b5a-bf4a9a8b7719;' +
            '__uzmb=1567763573;' +
            '__uzmd=1583748207;' +
            '__uzmc=2909931333232'
        }
      }
    }
  }
};
