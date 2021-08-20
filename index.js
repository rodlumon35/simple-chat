const express = require("express"),
  socket = require("socket.io"),
  app = express();

app.set("PORT", process.env.PORT || 5550);

const httpServer = app.listen(app.get("PORT"), () => {
  console.log(`http://localhost:${app.get("PORT")}/`);
});

app.use(express.static("public"));

const io = socket(httpServer, {
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"],
    credentials: true,
    transports: ["websocket", "polling"],
  },
  allowEIO3: true,
});

io.on("connection", (socket) => {
  console.log("socket connected");

  socket.on("chat message", (data) => {
    io.emit("chat message", data);
  });
});
