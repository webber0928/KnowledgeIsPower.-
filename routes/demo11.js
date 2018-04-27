"use strict";

console.log('----Demo11 Reboot Device');

const { dialogflow, Suggestions } = require("actions-on-google");
const app = dialogflow({ debug: false });

// if I have two device
const myDevice = [
  'rdsg-device1',
  'rdsg-device2'
];
//-----------------

app.intent('RebootDevice', (conv, params) => {
  if(myDevice.indexOf(params.DeviceName) >= 0){
    return conv.ask(`rdsg OK, are you sure you want to reboot ${params.DeviceName}?`);
  }
  conv.ask(`Which one? ${myDevice[0]}? ${myDevice[1]}?`);
  conv.ask(new Suggestions([
    `restart ${myDevice[0]}`,
    `restart ${myDevice[1]}`
  ]));
});

app.intent('RebootDevice - yes', (conv) => {
  let deviceName = conv.contexts.input['rebootdevice-followup'].parameters.DeviceName;
  conv.close(`OK! I see! reboot ${deviceName}`);
});

app.intent('RebootDevice - no', (conv) => {
  conv.close(`OK!`);
});

module.exports = app;