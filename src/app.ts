import express, {Request, Response, NextFunction} from 'express';
import { nextTick, resourceUsage } from 'process';
import config from 'config';
import connect from './utils/connect'
import chan from './utils/logger'
import routes from './routes'
import mongoose from 'mongoose'

const port = config.get<number>('port');

const app = express();

app.use(express.json())






// console.log("working")

app.listen(port, async () => {
    chan.info(`App is running at: ${port}`)

    await connect()
    // let mongoose = require('mongoose');
    // let mongoDB = 'insert_your_database_url_here';
    // mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
    // var db = mongoose.connection;
    // db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    routes(app)
});


