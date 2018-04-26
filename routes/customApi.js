"use strict";

const {
  dialogflow
} = require("actions-on-google");
const app = dialogflow({ debug: true });

app.intent("enable_my_guest_zone", (conv, params) => {
  conv.ask("my question");
  conv.close('How are you?');
  // conv.close(`Is this? ${params.device_name}\nand ${params.food}`);
});

app.intent('Default Welcome Intent', conv => {
  console.log('===========================================')
  console.log(conv.user)
  console.log('===========================================')
  conv.ask('Welcome to Test Dlink! Say your help!')
})

app.intent('Number Input', (conv, params) => {
  console.log(params);
  conv.close(`You said ${params.number}`)
})

app.intent('RebootDevice', (conv, params) => {
  console.log('=======');
  console.log(params);
  console.log('=======');
  conv.ask('OK, are you sure you want to reboot your router?');  
  // let DeviceName = params.DeviceName || DeviceName;
  // if (params.ok && params.DeviceName) {
  //   conv.close(`Reboot your router ${DeviceName}`);
  // } else {
  //   conv.add(`You device is ${DeviceName}`);
  //   conv.add('OK, are you sure you want to reboot your router?');
  // }
});

// app.intent('enable_guest_wifi', (conv, params) => {
//     conv.ask("my question");
//     conv.close(`Alright, your silly name is ${color} ${number}! I hope you like it. See you next time.`);
// });

// app.intent('make_name', (conv, {color, number}) => {
//     conv.data.someProperty = "someValue";
//     const conversationId = conv.id
//     const intent = conv.intent
//     console.log('L14 intent: ', intent);
//     console.log('L15 id: ', conversationId);
//     console.log('L16 data: ', conv.data);
//     conv.close(`Alright, your silly name is ${color} ${number}! I hope you like it. See you next time.`);
// });

// app.intent('Default Welcome Intent', conv => {
//     conv.ask('Welcome to action snippets! Say a number.')
// })

// app.intent('Number Input', (conv, {num}) => {
//     conv.close(`You said ${num}`)
// })

module.exports = app;
