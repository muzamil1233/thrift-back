import mongoose from "mongoose"

export const dbConnection = async (retries = 5, delayMs = 3000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(process.env.DB_URI);
      console.log("connected successfully");
      return; // success, stop retrying
    } catch (error) {
      console.log(`DB connection attempt ${attempt} failed:`, error.message);
      if (attempt < retries) {
        console.log(`Retrying in ${delayMs / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        console.log("All DB connection attempts failed. Exiting process.");
        process.exit(1); // let Render restart the service
      }
    }
  }
}