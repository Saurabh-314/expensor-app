import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const url = process.env.MONGO_DB_URL;

const MONGO_URL = `mongodb+srv://${username}:${password}@${url}/newMongo?retryWrites=true&w=majority`;

async function connect() {

  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  ).then(() => { console.log("connection successfull ") })
    .catch((err) => { console.log('database connection error', err) });

}
export default connect;