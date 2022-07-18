require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileupload({
    useTempFiles: true,
  })
);

// Connection with mongodb

const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

app.use("/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/categoryRoutes"));
app.use("/api", require("./routes/uploadRoutes"));
app.use("/api", require("./routes/productRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is ruuning at ${PORT}`);
});
