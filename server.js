const http = require("http");

const mongodb = require("mongodb");

let db;
const connectionString =
  "mongodb+srv://akbardushamboev5:8KC6nG6fOYMjR3Eh@cluster0.evntl.mongodb.net/Reja?retryWrites=true&w=majority&appName=Cluster0";

mongodb.connect(
  connectionString,
  {
    useNewUrlParcer: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("ERROR on connection MongoDB");
    else {
      console.log("MongoDB connected on Database");
      module.exports = client;
      const app = require("./app");
      const server = http.createServer(app);
      let PORT = 3000;
      server.listen(PORT, function () {
        console.log(
          `The server is running successfully on this port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
