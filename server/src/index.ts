if (process.env.NODE_ENV !== "production") {
  const path = require("path");
  require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
}

import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";


export function main() {

  const app = express();

  app.use("/auth", authRouter);

  // set up cors to allow us to accept requests from front end client
  app.use(
    cors({
        origin: process.env.CLIENT_URL || "",
        methods: "GET,PUT,DELETE",
        credentials: true,
    })
);

// start server
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

}

main();



