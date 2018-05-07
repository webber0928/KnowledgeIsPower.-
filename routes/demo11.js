"use strict";

console.log('----Demo11 Reboot Device');

const { dialogflow, Suggestions } = require("actions-on-google");
const app = dialogflow({ debug: false });


module.exports = app;

function delay() {   
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('我是傳下去的值');
    }, 1000);
  });
}

module.exports.pretreat = function (req, res, next){
  console.log('responseId :', req.body.responseId);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  console.log('queryResult.queryText :', req.body.queryResult.queryText);
  console.log('queryResult.action :', req.body.queryResult.action);
  console.log('queryResult.parameters :', req.body.queryResult.parameters);
  console.log('queryResult.allRequiredParamsPresent :', req.body.queryResult.allRequiredParamsPresent);
  console.log('queryResult.fulfillmentText :', req.body.queryResult.fulfillmentText);
  console.log('queryResult.fulfillmentMessages :', req.body.queryResult.fulfillmentMessage);
  console.log('queryResult.outputContexts :', req.body.queryResult.outputContexts);
  console.log('queryResult.intent :', req.body.queryResult.intent);
  console.log('queryResult.intentDetectionConfidence :', req.body.queryResult.intentDetectionConfidence);
  console.log('queryResult.diagnosticInfo :', req.body.queryResult.diagnosticInfo);
  console.log('queryResult.languageCode :', req.body.queryResult.languageCode);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  console.log('originalDetectIntentRequest.source :', req.body.originalDetectIntentRequest.source);
  console.log('originalDetectIntentRequest.version :', req.body.originalDetectIntentRequest.version);
  console.log('originalDetectIntentRequest.payload :', req.body.originalDetectIntentRequest.payload);
  console.log('originalDetectIntentRequest.payload.surface :', req.body.originalDetectIntentRequest.payload.surface);
  console.log('originalDetectIntentRequest.payload.inputs :', req.body.originalDetectIntentRequest.payload.inputs);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  console.log('session :', req.body.session);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  
  // Welcome
  // Welcome();
  app.intent('Default Welcome Intent', Welcome()['Default Welcome Intent']);
  
  // RebootDevice
  // RebootDevice();
  app.intent('RebootDevice', RebootDevice()['RebootDevice']);
  
  app.intent('RebootDevice - yes', RebootDevice()['RebootDevice - yes']);
  
  app.intent('RebootDevice - no', RebootDevice()['RebootDevice - no']);

  app.intent('TEST', (conv) => {

    return new Promise( function( resolve, reject ){
      delay().then(function (value) {
        console.log(value, 'L56');    // '我是傳下去的值'
        conv.add('HI localhost');
        resolve();
      }).catch(function (error) {
        console.log(error);
      });
    })
    
    // willIGetNewPhone.then(aaa => {
    //   console.log(aaa);
    // }).catch(err => console.error(err));
    // willIGetNewPhone
    // .then(function (fulfilled) {
    //   console.log(fulfilled)
    // })
    // .catch(function (error) {
    //   console.log(error.message)
    // })
  })

  return next();
};

function userInfoNotFound( conv, params, granted ){
  // Note: Currently, precise locaton only returns lat/lng coordinates on phones and lat/lng coordinates 
  // and a geocoded address on voice-activated speakers. 
  // Coarse location only works on voice-activated speakers.
  conv.ask(new SimpleResponse({
    speech:'Sorry, I could not find you',
    text: 'Sorry, I could not find you'
  }))
  conv.ask(new Suggestions(['Locate Me', 'Back to Menu',' Quit']))
}

function userInfoFound( conv, params, granted ){
  const permission = conv.arguments.get('PERMISSION'); // also retrievable with explicit arguments.get
  console.log('User: ' + conv.user)
  console.log('PERMISSION: ' + permission)
  const location = conv.device.location.coordinates
  console.log('Location ' + JSON.stringify(location))

  return new Promise( function( resolve, reject ){
    // Reverse Geocoding
    geocoder.reverseGeocode(location.latitude,location.longitude,(err,data) => {
      if (err) {
        console.log(err)
        reject( err );
      } else {
        // console.log('geocoded: ' + JSON.stringify(data))
        console.log('geocoded: ' + JSON.stringify(data.results[0].formatted_address))
        conv.ask(new SimpleResponse({
          speech:'You currently at ' + data.results[0].formatted_address + '. What would you like to do now?',
          text: 'You currently at ' + data.results[0].formatted_address + '.'
        }))
        conv.ask(new Suggestions(['Back to Menu', 'Learn More', 'Quit']))
        resolve()
      }
    })
  });

}

function userInfo ( conv, params, granted) {
  if (conv.arguments.get('PERMISSION')) {
    return userInfoFound( conv, params, granted );
  } else {
    return userInfoNotFound( conv, params, granted );
  }
}

function Welcome() {
  return {
    'Default Welcome Intent': (conv) => {
      console.log('===========================================')
      console.log(conv.user)
      console.log('===========================================')
      conv.ask('Welcome to Test Dlink! Say your help!')
    },
  };
}

function RebootDevice() {
  
  const myDevice = [
    'rdsg-device1',
    'rdsg-device2'
  ];

  return {
    'RebootDevice': (conv, params) => {
      if(myDevice.indexOf(params.DeviceName) >= 0){
        return conv.ask(`rdsg OK, are you sure you want to reboot ${params.DeviceName}?`);
      }
      conv.ask(`Which one? ${myDevice[0]}? ${myDevice[1]}?`);
      conv.ask(new Suggestions([
        `restart ${myDevice[0]}`,
        `restart ${myDevice[1]}`
      ]));
    },
    'RebootDevice - yes': (conv) => {
      let deviceName = conv.contexts.input['rebootdevice-followup'].parameters.DeviceName;
      conv.close(`OK! I see! reboot ${deviceName}`);
    },
    'RebootDevice - no': (conv) => {
      conv.close(`OK!`);
    },
  };
}