import net from "node:net";

const clients = [];
const server = net.createServer((socket) => {
  clients.push(socket);
  socket.write("you can chat here");

  // here socket is a stream
  socket.on("data", (chunk) => {
    const message = chunk.toString().trim();
    clients.forEach((client) => {
      client.write(`${message}`);
    });
  });

  socket.on("end", () => {
    const index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }

    console.log("client disconnected");
    console.log("connected clients", clients.length);
  });

  console.log("client connected");
});

server.listen(1337, () => {
  console.log("Server listening on port 1337");
});
