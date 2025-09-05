import net from "node:net";

const clients = [];

const server = net.createServer((socket) => {
  console.log("client connected");

  socket.setEncoding("utf-8");
  socket.authenticated = false;
  socket.joined = false;
  socket.username = "";

  clients.push(socket);

  socket.on("data", (chunk) => {
    const message = chunk.toString().trim();
  });

  socket.on("end", () => {
    console.log("client disconnected");
  });
});

function parseMessage(message) {}

server.listen(1337, () => {
  console.log("Server listening on port 1337");
});
