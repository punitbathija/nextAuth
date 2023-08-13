import mongoose from "mongoose";

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.mongo_url!);
    const connnection = mongoose.connection;
    connnection.on("connected", () => {
      console.log("DB is successfully connected");
    });
    connnection.on("error", (err) => {
      console.log("DB encountered an error" + err);
      process.exit();
    });
  } catch (err) {
    console.log("Something went wrong");
    console.log(err);
  }
}
