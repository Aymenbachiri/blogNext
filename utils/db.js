import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    throw new Error("failed to connect to mongodb");
  }
};
export default connect;
