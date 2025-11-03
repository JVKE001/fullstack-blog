import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to database ${conn.connection.host}`.bold.blue);
  } catch (error) {
    console.error(`Error while connecting to database: ${error}`.red.bold);
  }
};

export default connectDB
