// import mongooseLoader from './mongoose';
import expressLoader from './express';
import Logger from './logger';

export default async (app) => {
  // const mongoConnection = mongooseLoader();
  // mongoConnection.on('error', console.error.bind(console, 'connection error:'));
  // mongoConnection.once('open', () => Logger.info('✌️ DB loaded and connected!'));

  expressLoader(app);
  Logger.info('✌️ Express loaded');
}