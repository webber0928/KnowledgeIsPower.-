var express = require('express');
var router = express.Router();
const { DialogflowApp } = require('actions-on-google');

router.post('/', function(req, res, next) {
    const NAME_ACTION = 'make_name';
    const COLOR_ARGUMENT = 'color';
    const NUMBER_ARGUMENT = 'number';
    const app = new DialogflowApp({ request: req, response: res });
    
    let actionMap = new Map();
    actionMap.set(NAME_ACTION, () => {
        let number = app.getArgument(NUMBER_ARGUMENT);
        let color = app.getArgument(COLOR_ARGUMENT);
        app.tell(`Alright, your silly name is ${color} ${number} ! I hope you like it. See you next time.`);
    });

    app.handleRequest(actionMap);
});

module.exports = router;
