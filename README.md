# Actions on Google Demo

參考 action 的 [sample](https://developers.google.com/actions/samples/) 去實作的，使用 express 做 Webhook。

可以用 ngrok 弄成的　webhook 放到 dialogflow 的 fulfillment 上。

## Requirements

- [google action account](https://console.actions.google.com)
- [dialogflow account](https://console.dialogflow.com/api-client/#/login)
- nodejs v8.9.1 [download](https://nodejs.org/en/download/)
- ngrok [download](https://ngrok.com/download)

## Install NVM (Node Version Manager) & Nodejs 8.9.1

> 如果你跟我一樣是用　window？ 我看直接安裝 exe 比較快啦！

1. curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
2. restart the console
3. nvm install 8.9.1
4. nvm alias default 8.9.1

## Install & run api

`$ npm i & npm start`

## Reference

- action-on-google API: https://actions-on-google.github.io/actions-on-google-nodejs/classes/dialogflow.dialogflowconversation.html#ask

## Future

- Api 建立 agent
- Api 建立 intents
- Todo...