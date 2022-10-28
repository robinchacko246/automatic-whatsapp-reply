// const wppconnect = require('@wppconnect-team/wppconnect');
// const firebasedb = require('./firebase.js');

// var userStages = [];
// wppconnect.create({
//     session: 'whatsbot11',
//     autoClose: false,
//      puppeteer: {headless: true, executablePath: '/path/to/Chrome',args: ['--no-sandbox', '--disable-setuid-sandbox']} 
//    // puppeteerOptions: {headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']}
// })
//     .then((client) =>
//         client.onMessage((message) => {
//             console.log('User typed message: ' + message.body);
//             queryUserByPhone(client, message);
//         }))
//     .catch((error) => console.log(error));


// async function queryUserByPhone(client, message) {
//     let phone = (message.from).replace(/[^\d]+/g, '');
//     let userdata = await firebasedb.queryByPhone(phone);
//     if (userdata == null) {
//         userdata = await saveUser(message);
//     }
//     console.log('Current user: ' + userdata['id']);
//     stages(client, message, userdata);
// }


// //  Stages = ola  >>  nome  >>  cpf  >>  fim
// async function stages(client, message, userdata) {
//     if (userStages[message.from] == undefined) {
//         sendWppMessage(client, message.from, `Welcome to Robin's Whatsapp Robot!`);
//     }
//     if (userdata['nome'] == undefined) {
//         if (userStages[message.from] == undefined) {
//             sendWppMessage(client, message.from, 'Type your name*:');
//             userStages[message.from] = 'nome';
//         } else {
//             userdata['nome'] = message.body;
//             firebasedb.update(userdata);
//             sendWppMessage(client, message.from, 'Thanks, ' + message.body);
//            // sendWppMessage(client, message.from, 'Enter your *CPF*:');
//             userStages[message.from] = 'cpf';
//         }

//     } 
    
//     // else if (userdata['cpf'] == undefined) {
//     //     if (userStages[message.from] == undefined) {
//     //         sendWppMessage(client, message.from, 'Digite seu *CPF*:');
//     //         userStages[message.from] = 'cpf';
//     //     } else {
//     //         userdata['cpf'] = (message.body).replace(/[^\d]+/g, '');
//     //         firebasedb.update(userdata);
//     //         sendWppMessage(client, message.from, 'Obrigada por informar seu CPF: ' + message.body);
//     //         sendWppMessage(client, message.from, 'Fim');
//     //         userStages[message.from] = 'fim';
//     //     }

//     // } else {
//     //     if (userStages[message.from] == undefined) {
//     //         userStages[message.from] = 'fim';
//     //     }
//     //     sendWppMessage(client, message.from, 'Fim');
//     // }
// }


// function sendWppMessage(client, sendTo, text) {
//     client.sendText(sendTo, text)
//         .then((result) => {
//             // console.log('SUCESSO: ', result); 
//         })
//         .catch((erro) => {
//             console.error('ERRO: ', erro);
//         });
// }

// async function saveUser(message) {
//     let user = {
//        // 'pushname': (message['sender']['pushname'] != undefined) ? message['sender']['pushname'] : '',
//         'whatsapp': (message.from).replace(/[^\d]+/g, '')
//     }
//     let newUser = firebasedb.save(user);
//     return newUser;
// }

const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client({ puppeteer: {headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']} });
// You can use an existing session and avoid scanning a QR code by adding a "session" object to the client options.
// This object must include WABrowserId, WASecretBundle, WAToken1 and WAToken2.


// Get QR code to scan WhatsAPP
client.on('qr', qr => {
    console.log(qr);
    qrcode.generate(qr, {small: true});
});
client.on('ready', () => {
    console.log('Client is ready!');
});
client.on('message', message => {
//     console.log(message.body);
     var nr = message.body.search(/robin/i);
    
//     var loveNumber = message.body.search(/love you/i);
//     console.log("nr",nr);
 nr>=0 ?  message.reply("hello dear 🥰-{auto generated-robinBot}"):"";
// loveNumber>=0 ?  message.reply("hello dear 🥰,i love you-{auto generated}"):"";
});
// List of data for automatic reply
var data = [
{ id: 1, received: 'Hello', reply: 'Hi-{auto generated-robinbot}'},
{ id: 2, received: 'Sorry', reply: 'No problem-{auto generated-robinbot}'},
{ id: 3, received: 'Can we have a call?', reply: 'Please leave a voice message. Let us connect in an hour. Kind Reards, Robin chacko-{auto generated-robinbot}'},
{ id: 4, received: 'hi', reply: 'Hello-{auto generated-robinbot}'},
{ id: 5, received: 'Hi', reply: 'Hello-{auto generated-robinbot}'},
{ id: 6, received: 'hello', reply: 'Hi-{auto generated-robinbot}'},
{ id: 7, received: 'da', reply: 'Hi-{auto generated-robinbot}'},
{ id: 8, received: 'Da', reply: 'Hi-{auto generated-robinbot}'},
{ id: 9, received: 'sorry', reply: 'No problem-{auto generated-robinbot}'},
{ id: 10, received: 'call', reply: 'Please leave a voicemessage. Let us connect in an hour. Kind Reards, Robin chacko-{auto generated-robinbot}}'},
{ id: 11, received: 'Oii', reply: 'Hi-{auto generated-robinbot}'},
{ id: 12, received: 'oii', reply: 'Hi-{auto generated-robinbot}'},
{ id: 13, received: 'oi', reply: 'Hi-{auto generated-robinbot}'},
{ id: 14, received: 'Oi', reply: 'Hi-{auto generated-robinbot}'},
{ id: 15, received: '@Robin', reply: 'Hi-{auto generated-robinbot}'},

{ default: 'Please leave a voicemail. Let us connect in an hour. Kind Reards,Robin chacko-{auto generated-robinbot} ' }
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
