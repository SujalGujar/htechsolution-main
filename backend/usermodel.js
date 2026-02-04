import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/myapp")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

export default User;
