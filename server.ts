import express from 'express';
import json from 'body-parser';
import mongoose from 'mongoose';
import contact from './src/models/contactModel';
import Config from './config/Config';
import { Configuration } from 'tslint';

const app = express();


mongoose.Promise = global.Promise;


const databaseConfig = new Config()
mongoose.connect(databaseConfig.getConnectionString(process.env.NODE_ENV));


var contactRoutes = require('./src/routes/contactRoutes');
app.use('/', contactRoutes);
//routes(app);

module.exports = app;