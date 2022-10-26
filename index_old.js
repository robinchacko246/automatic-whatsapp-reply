const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client({ puppeteer: {headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']} });
// You can use an existing session and avoid scanning a QR code by adding a "session" object to the client options.
// This object must include WABrowserId, WASecretBundle, WAToken1 and WAToken2.

client.initialize();
// Get QR code to scan WhatsAPP
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
client.on('ready', () => {
    console.log('Client is ready!');
});
client.on('message', message => {
    console.log(message.body);
    var nr = message.body.search(/robin/i);
    var loveNumber = message.body.search(/love you/i);
    console.log("nr",nr);
nr>=0 ?  message.reply("hello dear 🥰"):"";
loveNumber>=0 ?  message.reply("hello dear 🥰,i love you"):"";
});
// List of data for automatic reply
var data = [
{ id: 1, received: 'Hello', reply: 'Hi'},
{ id: 2, received: 'Sorry', reply: 'No problem'},
{ id: 3, received: 'Can we have a call?', reply: 'Please leave a voicemail. Let us connect in an hour. Kind Reards, Robin chacko'},
{ id: 4, received: 'hi', reply: 'Hello'},
{ id: 4, received: 'Hi', reply: 'Hello'},
{ default: 'Please leave a voicemail. Let us connect in an hour. Kind Reards,Robin chacko ' }
];
client.on('message', message => {
  var selectedData = data.find((msg) => {
  if(msg.received === message.body) {
    return true
  }
});
var sourceMsg, targetMsg;
if(selectedData && Object.keys(selectedData).length !== 0 && selectedData.constructor === Object) {
  sourceMsg = selectedData.received;
  targetMsg = selectedData.reply;
}
// test data
// const sourceMsg = 'Hello';
// const targetMsg = 'I am occupied at present. You can leave me SMS here, will call you shortly.';
// send message





if(message.body === sourceMsg) {
  message.reply(targetMsg);
} else {
 // message.reply("Please call me in 8138813237. Kind Reards,Robin chacko");
}
});
client.initialize();
