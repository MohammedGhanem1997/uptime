import mongoose from 'mongoose'

export default class MongoConnection {
  public static connect() {
    console.log(process.env.MONGODB_URI);
    
    mongoose.connect(String(process.env.MONGODB_URI))
  }
}
