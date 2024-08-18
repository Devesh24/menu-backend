const express = require("express");
const app = express();
const mongoose  = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const categoryRoute = require("./routes/category");
const subcategoryRoute = require("./routes/subcategory");
const itemRoute = require("./routes/item");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection Successfull..")
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/categories", categoryRoute);
app.use("/api/subcategories", subcategoryRoute);
app.use("/api/items", itemRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running..");
});
