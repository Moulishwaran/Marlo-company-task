const express = require("express");
const mongoose = require("mongoose");

const Contact = require("./models/contactModel");
const contactRoute = require("./routes/contact");

const app = express();
app.use(express.json());

app.use("/api/v1/contact", contactRoute);

mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/contacts", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB DataBase Connected ");
  } catch (error) {
    console.log("MongoDB Database connection Failed");
  }
};

const port = 5000;

app.listen(port, () => {
  connect();
  console.log(`Server listening on port:${port}`);
});
