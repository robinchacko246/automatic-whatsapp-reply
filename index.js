const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const client = new Client();
// Get QR code to scan WhatsAPP
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});
client.on("ready", () => {
  console.log("Client is ready!");
});
client.on("message", (message) => {
  console.log(message.body);
  var nr = message.body.search(/robin/i);

  console.log("nr", nr);
  nr >= 0 ? message.reply("hello dear 🥰") : "";
});
// List of data for automatic reply
var data = [
  { id: 1, received: "Hello", reply: "Hi" },
  { id: 2, received: "Sorry", reply: "No problem" },
  {
    id: 3,
    received: "Can we have a call?",
    reply:
      "Please leave a voicemail. Let us connect in an hour. Kind Reards, Robin chacko",
  },
  { id: 4, received: "hi", reply: "Hello" },
  { id: 4, received: "Hi", reply: "Hello" },
  {
    default:
      "Please leave a voicemail. Let us connect in an hour. Kind Reards,Robin chacko ",
  },
];
client.on("message", (message) => {
  var selectedData = data.find((msg) => {
    if (msg.received === message.body) {
      return true;
    }
  });
  var sourceMsg, targetMsg;
  if (
    selectedData &&
    Object.keys(selectedData).length !== 0 &&
    selectedData.constructor === Object
  ) {
    sourceMsg = selectedData.received;
    targetMsg = selectedData.reply;
  }
  // test data
  // const sourceMsg = 'Hello';
  // const targetMsg = 'I am occupied at present. You can leave me SMS here, will call you shortly.';
  // send message

  if (message.body === sourceMsg) {
    message.reply(targetMsg);
  } else {
    // message.reply("Please call me in 8138813237. Kind Reards,Robin chacko");
  }
});
client.initialize();
