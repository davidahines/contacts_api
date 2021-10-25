import express from 'express';
import json from 'body-parser';
import mongoose from 'mongoose';
import contact from './src/models/contactModel';
import Config from './config/Config';
import { Configuration } from 'tslint';

const app = express();
app.use(express.json);


mongoose.Promise = global.Promise;


const databaseConfig = new Config();
mongoose.connect(databaseConfig.getConnectionString(process.env.NODE_ENV)).catch(error => console.log("mongoose connection error"+error));


mongoose.connection.on('error', err => {
    console.log("mongoose error" + err);
});

mongoose.connection.on('connecting', () => { 
    console.log('connecting')
    console.log(mongoose.connection.readyState); //logs 2
  });
  mongoose.connection.on('connected', () => {
    console.log('connected');
    console.log(mongoose.connection.readyState); //logs 1
  });
  mongoose.connection.on('disconnecting', () => {
    console.log('disconnecting');
    console.log(mongoose.connection.readyState); // logs 3
  });
  mongoose.connection.on('disconnected', () => {
    console.log('disconnected');
    console.log(mongoose.connection.readyState); //logs 0
  });

var contactRoutes = require('./src/routes/contactRoutes');
app.use('/', contactRoutes);
//routes(app);

module.exports = app;