// import mongoose from "mongoose";
// const MONGO_URl = "mongodb+srv://sujalgurjar919_db_user:uqIDDDe27JqT7IqU@cluster0.0iitcca.mongodb.net/?appName=Cluster0"

// const connectDB = async () =>{
//     try{
//         await mongoose.connect(MONGO_URl)
//         console.log("MongoDB connected")
//     }catch(err){
//         console.log("MongoDB connection error:", err)
//         process.exit(1)
//     }
// }
// export default connectDB

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is missing in .env");
    }

    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;

