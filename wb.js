let theList = [
  "Stop guest WiFi On {DeviceName}",
  "Stop guest WiFi Network On {DeviceName}",
  "Stop guest zone On {DeviceName}",
  "Stop my guest WiFi On {DeviceName}",
  "Stop my guest WiFi Network On {DeviceName}",
  "Stop my guest zone On {DeviceName}",
  "Stop the guest WiFi On {DeviceName}",
  "Stop the guest WiFi Network On {DeviceName}",
  "Stop the guest zone On {DeviceName}",
  "turn off guest WiFi",
  "turn off guest WiFi Network",
  "turn off guest zone",
  "turn off my guest WiFi",
  "turn off my guest WiFi Network",
  "turn off my guest zone",
  "turn off the guest WiFi",
  "turn off the guest WiFi Network",
  "turn off the guest zone",
  "turn off guest WiFi On {DeviceName}",
  "turn off guest WiFi Network On {DeviceName}",
  "turn off guest zone On {DeviceName}",
  "turn off my guest WiFi On {DeviceName}",
  "turn off my guest WiFi Network On {DeviceName}",
  "turn off my guest zone On {DeviceName}",
  "turn off the guest WiFi On {DeviceName}",
  "turn off the guest WiFi Network On {DeviceName}",
  "turn off the guest zone On {DeviceName}",
  "deactivate guest WiFi",
  "deactivate guest WiFi Network",
  "deactivate guest zone",
  "deactivate my guest WiFi",
  "deactivate my guest WiFi Network",
  "deactivate my guest zone",
  "deactivate the guest WiFi",
  "deactivate the guest WiFi Network",
  "deactivate the guest zone",
  "deactivate guest WiFi On {DeviceName}",
  "deactivate guest WiFi Network On {DeviceName}",
  "deactivate guest zone On {DeviceName}",
  "deactivate my guest WiFi On {DeviceName}",
  "deactivate my guest WiFi Network On {DeviceName}",
  "deactivate my guest zone On {DeviceName}",
  "deactivate the guest WiFi On {DeviceName}",
  "deactivate the guest WiFi Network On {DeviceName}",
  "deactivate the guest zone On {DeviceName}"
];

let article = '';

theList.forEach((v, i) => {
  if (v.indexOf('{DeviceName}') >= 0){
    v = v.split('{DeviceName}')[0];
    let s = `
    {
      "data": [
        {
          "text": "${v}"
        },
        {
          "text": "DeviceName",
          "alias": "DeviceName",
          "meta": "@sys.any",
          "userDefined": true
        }
      ],
      "isTemplate": false,
      "count": 0,
      "updated": 1525341863,
      "isAuto": false
    },`;
    article = article + s;
    // console.log(v);
  } else {
    let s = `
    {
      "data": [
        {
          "text": "${v}"
        }
      ],
      "isTemplate": false,
      "count": 0,
      "updated": 1525341863,
      "isAuto": false
    },`;
    article = article + s;
  }
});
console.log(article);

function tempDefault() {

}

function tempDeviceName() {

}

function tempCredentialRequest() {

}


function tempEnableRequest() {

}

function tempFwVersion() {

}


var fs = require('fs');
fs.writeFile("./wb.text", article, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 