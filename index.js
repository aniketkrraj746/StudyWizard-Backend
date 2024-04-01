// const express = require("express");
const express = require("express");
const app = express();

// import routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentsRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

// import configurations
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;

// database connect
database.connect();
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true, // when we are using temp files to save the uploaded images before
    tempFileDir: "/tmp",
  })
);

cloudinaryConnect();
//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payments", paymentsRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    Message: "Your sever is up and running at port : " + PORT,
  });
});

app.listen(PORT, () => {
  console.log(`app is running at port  ${PORT}`);
});
