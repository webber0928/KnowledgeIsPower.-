"use strict";

const { dialogflow } = require('actions-on-google');
const app = dialogflow({ debug: true });

app.intent('weater', (conv, params) => {
    console.log('L7', params);
    conv.close('How are you?');
});
app.intent('enable_guest_wifi', (conv, params) => {
    conv.ask("my question");
    conv.close(`Alright, your silly name is ${color} ${number}! I hope you like it. See you next time.`);
});

app.intent('make_name', (conv, {color, number}) => {
    conv.close(`Alright, your silly name is ${color} ${number}! I hope you like it. See you next time.`);
});

module.exports = app;
