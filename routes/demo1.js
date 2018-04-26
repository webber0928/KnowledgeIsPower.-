"use strict";

console.log('----This Demo1 Device');

const { dialogflow } = require("actions-on-google");
const app = dialogflow({ debug: true });


app.intent('normal ask', (conv) => {
    conv.ask('Ask me to show you a list, carousel, or basic card.');
  });

module.exports = app;