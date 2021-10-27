import express from 'express';
import mongoose from 'mongoose';
import Config from './config/config';
import {contactsRouter} from './src/routes/contactRoutes';
import Logger from './src/lib/logger';
import contactModel from './src/models/contactModel';

const app = express();
app.use(express.json());


mongoose.Promise = global.Promise;


const databaseConfig = new Config();
mongoose.connect(databaseConfig.getConnectionString(process.env.NODE_ENV))
  .catch(error => {
    const  errStr= String(error);
    Logger.info(`mongoose connection error${errStr}`)
  });


mongoose.connection.on('error', error => {
    // tslint:disable-next-line:no-console
    const errStr = String(error);
    Logger.info(`mongoose connection error${errStr}`);
});

mongoose.connection.on('connecting', () => {
    // tslint:disable-next-line:no-console
    Logger.info('connecting')
    // tslint:disable-next-line:no-console
    Logger.info(mongoose.connection.readyState); // logs 2
  });
  mongoose.connection.on('connected', () => {
      // tslint:disable-next-line:no-console
    Logger.info('connected');
    // tslint:disable-next-line:no-console
    Logger.info(mongoose.connection.readyState); // logs 1
  });
  mongoose.connection.on('disconnecting', () => {
      // tslint:disable-next-line:no-console
    Logger.info('disconnecting');
    // tslint:disable-next-line:no-console
    Logger.info(mongoose.connection.readyState); // logs 3
  });
  mongoose.connection.on('disconnected', () => {
      // tslint:disable-next-line:no-console
    Logger.info('disconnected');
    // tslint:disable-next-line:no-console
    Logger.info(mongoose.connection.readyState); // logs 0
  });

export function closeMongoose() {
  mongoose.connection.close();
}

export function clearTestDb() {
  contactModel.remove({}, function(err: any) { 
    if(err){
      Logger.warn(`server.ts: Mongoose error: ${err}`);
    }else{
      Logger.warn("Cleared test db."); // logs 0
    }
 });
}

app.use('/contacts', contactsRouter);
// routes(app);
export default app;

