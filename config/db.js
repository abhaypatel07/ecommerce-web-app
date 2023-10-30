import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected To Mongodb Database successfully..`.bgMagenta.white);
  } catch (err) {
    console.log(`Error in mongodb ${err}`.bgRed.white);
  }
};

export default connectDB;
