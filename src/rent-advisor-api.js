// import dependencies
import fs from 'fs';
import express from 'express';
import https from 'https';
import http from 'http';
import loaders from './loaders/index';
import Logger from './loaders/logger';
import config from './config';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

async function startServer() {

  const app = express();

  await loaders(app);

  if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'geodis') {
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/nd-api.duckdns.org/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/nd-api.duckdns.org/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/nd-api.duckdns.org/chain.pem', 'utf8');
    const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca
    };
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(config.https.port, () => {
      Logger.info(`🛡️  Server running on port: ${config.https.port} 🛡️`);
    });
  } else {
    const httpServer = http.createServer(app);
    httpServer.listen(config.http.port, () => {
      Logger.info(`🛡️  Server running on port: ${config.http.port} 🛡️`);
    });
  }
}

startServer();
