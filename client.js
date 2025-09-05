import net from "node:net";
import readline from "node:readline/promises";

const HOST = "localhost";
const PORT = 1337;

async function startChat() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">",
  });

  const client = net.createConnection(
    {
      host: HOST,
      port: PORT,
    },
    () => {
      console.log("connected to server");
    }
  );

  //   get username and token
  const username = rl.question("enter your username");

  const token = rl.question("enter your token");

  //   prepare auths
  const authCommand = buildCommand(
    "AUTH",
    {
      User: username,
      Token: token,
      "content-length": 0,
    },
    ""
  );

  client.write(authCommand);

  client.on("data", (data) => {
    console.log(data.toString());
  });
}

function buildCommand(command, headers, body) {
  const startLine = `CHAT/1.0 ${command}`;
  const headerLines = [];

  for (const key in headers) {
    const header = `${key}: ${headers[key]}`;
    headerLines.push(header);
  }

  return `${startLine}\r\n${headerLines.join("\r\n")}\r\n\r\n${body}`;
}

startChat();
