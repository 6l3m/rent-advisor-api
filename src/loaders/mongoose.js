import mongoose from 'mongoose';
import config from '../config/index';

export default () => {
  mongoose.connect(config.databaseURL, { useNewUrlParser: true });
  return mongoose.connection;
};