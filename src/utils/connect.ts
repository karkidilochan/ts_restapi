//here we house our database connection.

import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

async function connect() {
    const dbUri = config.get<string>("dbUri");
    try{
        // await mongoose.connect(dbUri).then(
        //     () => {
        //         console.log("Connected to database")
        //     })
        // await mongoose.connect("mongodb+srv://dilochan:fFB4u7y6Kv6w)MJ@cluster0.znu4p.mongodb.net/products?retryWrites=true&w=majority")
        await mongoose.connect(dbUri)
        logger.info("Connection to database established.")
    } 
    catch (error){
        logger.error("Connection failed");
        logger.error(error);

        process.exit(1);
        
    }
}

export default connect;