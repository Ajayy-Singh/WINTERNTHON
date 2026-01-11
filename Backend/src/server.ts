// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
// import app from "./app";


// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI as string)
//   .then(() => {
//     console.log("MongoDB Connected");
//     app.listen(PORT, () =>
//       console.log(`Server running on port ${PORT}`)
//     );
//   })
//   .catch((err) => console.log(err));



import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 5000;

console.log("Trying MongoDB URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection FAILED ❌");
    console.error(err);
    process.exit(1); // 👈 clear crash
  });
