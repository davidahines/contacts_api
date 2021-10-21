import express from 'express';
import json from 'body-parser';
import mongoose from 'mongoose';
import contact from './src/models/contactModel';
import Config from './config/Config';
import { Configuration } from 'tslint';

const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;


const databaseConfig = new Config()
mongoose.connect(databaseConfig.getConnectionString(process.env.NODE_ENV));


var routes = require('./src/routes/contactRoutes');
routes(app);

module.exports = app;