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
  }
}
