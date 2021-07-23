require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socketServer = require("./socketServer");
const { ExpressPeerServer } = require("peer");
const path = require("path");

// app config
const app = express();
const PORT = process.env.PORT || 6900;

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// socket
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socketServer(socket);
});

// peer server
ExpressPeerServer(http, {
  path: "/",
});

// mongo db connection
const URI = process.env.MONGO_URL;
mongoose
  .connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect to database successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// endpoint routes
app.use("/api", require("./routes/Auth.route"));
app.use("/api", require("./routes/User.route"));
app.use("/api", require("./routes/Post.route"));
app.use("/api", require("./routes/Comment.route"));
app.use("/api", require("./routes/Notify.route"));
app.use("/api", require("./routes/Message.route"));

// listen
http.listen(PORT, () => {
  console.log("server running on port : " + PORT);
});
