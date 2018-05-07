"use strict";

console.log('----This Demo10');

const { DialogflowApp } = require('actions-on-google');
// const app = dialogflow({ debug: true });

// module.exports = app;

module.exports.pretreat = function (req, res, next){
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
    const app = new DialogflowApp({ request: req, response: res });

    // console.log('responseId :', req.body.originalRequest.data);
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    // console.log('queryResult.queryText :', req.body.queryResult.queryText);
    // console.log('queryResult.action :', req.body.queryResult.action);
    // console.log('queryResult.parameters :', req.body.queryResult.parameters);
    // console.log('queryResult.allRequiredParamsPresent :', req.body.queryResult.allRequiredParamsPresent);
    // console.log('queryResult.fulfillmentText :', req.body.queryResult.fulfillmentText);
    // console.log('queryResult.fulfillmentMessages :', req.body.queryResult.fulfillmentMessage);
    // console.log('queryResult.outputContexts :', req.body.queryResult.outputContexts);
    // console.log('queryResult.intent :', req.body.queryResult.intent);
    // console.log('queryResult.intentDetectionConfidence :', req.body.queryResult.intentDetectionConfidence);
    // console.log('queryResult.diagnosticInfo :', req.body.queryResult.diagnosticInfo);
    // console.log('queryResult.languageCode :', req.body.queryResult.languageCode);
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    // console.log('originalDetectIntentRequest.source :', req.body.originalDetectIntentRequest.source);
    // console.log('originalDetectIntentRequest.version :', req.body.originalDetectIntentRequest.version);
    // console.log('originalDetectIntentRequest.payload :', req.body.originalDetectIntentRequest.payload);
    // console.log('originalDetectIntentRequest.payload.surface :', req.body.originalDetectIntentRequest.payload.surface);
    // console.log('originalDetectIntentRequest.payload.inputs :', req.body.originalDetectIntentRequest.payload.inputs);
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    // console.log('session :', req.body.session);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

    console.log(app.getIntent());
    const Welcome_ACTION = 'Default Welcome Intent';
    const help_ACTION = 'help';
    // Make a silly name
    function makeName (app) {
        app.tell('Alright, your silly name is! I hope you like it. See you next time.');
    }

    let actionMap = new Map();
    actionMap.set(Welcome_ACTION, makeName);
    actionMap.set(help_ACTION, makeName);

    app.handleRequest(actionMap);

    // app.intent('Default Welcome Intent', (conv) => {
    //     console.log('===========================================')
    //     console.log(conv.user)
    //     console.log('===========================================')
    //     conv.ask('Welcome to Test Dlink! Say your help!')
    // });

    // app.intent('help', (conv) => {
    //     console.log('===========================================')
    //     console.log(conv.user)
    //     console.log('===========================================')
    //     conv.close('Welcome to Test Dlink! Say your help!')
    // });
  

};