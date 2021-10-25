import express from 'express';
import json from 'body-parser';
import mongoose from 'mongoose';
import contact from './src/models/contactModel';
import Config from './config/Config';
import { Configuration } from 'tslint';
import contactRoutes = require('./src/routes/contactRoutes');

const app = express();
app.use(express.json);


mongoose.Promise = global.Promise;


const databaseConfig = new Config();
// tslint:disable-next-line:no-console
mongoose.connect(databaseConfig.getConnectionString(process.env.NODE_ENV)).catch(error => console.log("mongoose connection error"+error));


mongoose.connection.on('error', err => {
    // tslint:disable-next-line:no-console
    console.log("mongoose error" + err);
});

mongoose.connection.on('connecting', () => {
    // tslint:disable-next-line:no-console
    console.log('connecting')
    // tslint:disable-next-line:no-console
    console.log(mongoose.connection.readyState); // logs 2
  });
  mongoose.connection.on('connected', () => {
      // tslint:disable-next-line:no-console
    console.log('connected');
    // tslint:disable-next-line:no-console
    console.log(mongoose.connection.readyState); // logs 1
  });
  mongoose.connection.on('disconnecting', () => {
      // tslint:disable-next-line:no-console
    console.log('disconnecting');
    // tslint:disable-next-line:no-console
    console.log(mongoose.connection.readyState); // logs 3
  });
  mongoose.connection.on('disconnected', () => {
      // tslint:disable-next-line:no-console
    console.log('disconnected');
    // tslint:disable-next-line:no-console
    console.log(mongoose.connection.readyState); // logs 0
  });


app.use('/', contactRoutes);
// routes(app);
export default app;