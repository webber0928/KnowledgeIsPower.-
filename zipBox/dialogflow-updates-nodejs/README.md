# Actions on Google: Updates API sample using Node.js and Cloud Functions for Firebase

This sample shows an app that gives tips about developing apps for the Google Assistant
using Actions on Google.

## Setup Instructions

### Steps
1. Use the [Actions on Google Console](https://console.actions.google.com) to add a new project with a name of your choosing.
1. Under *Build a custom app*, click *BUILD* in the Dialogflow box and then click *Create Actions on Dialogflow*.
1. Click *Save* to save the project.
1. Click on the gear icon to see the project settings.
1. Select *Export and Import*.
1. Select *Restore from zip*. Follow the directions to restore from the `AoG-Tips.zip` file in this repo.
1. Go to the [Firebase console](https://console.firebase.google.com) and select the project that you have created on the Actions on Google console.
1. Click the gear icon, then select *Project settings* > *SERVICE ACCOUNTS*.
1. Generate a new private key and save it in the `functions` folder calling the file `service-account.json`.
1. Deploy the fulfillment webhook provided in the functions folder using [Google Cloud Functions for Firebase](https://firebase.google.com/docs/functions/):
   1. Follow the instructions to [set up and initialize Firebase SDK for Cloud Functions](https://firebase.google.com/docs/functions/get-started#set_up_and_initialize_functions_sdk). Make sure to select the project that you have previously generated in the Actions on Google Console and to reply `N` when asked to overwrite existing files by the Firebase CLI.
   1. Run `firebase deploy --only functions` and take note of the endpoint where the fulfillment webhook has been published. It should look like `Function URL (aogTips): https://${REGION}-${PROJECT}.cloudfunctions.net/aogTips`
1. Go back to the Dialogflow console and select *Fulfillment* from the left navigation menu.
1. Enable *Webhook*, set the value of *URL* to the `Function URL` from the previous step, then click *Save*.
1. Go to the [Firebase console](https://console.firebase.google.com) and select the project that you have created on the Actions on Google console.
1. In the *Database* section, click *Try Firestore Beta*.
1. Click *Enable*. While testing this sample, you can keep the database world readable.
1. To add tips to the newly created Firestore database, load in a browser `https://${REGION}-${PROJECT}.cloudfunctions.net/restoreTipsDB`.
1. Go back to the [Actions on Google console](https://console.actions.google.com) and select the project that you have created for this sample.
1. Follow the *Console Setup* instructions in the [Daily Updates](https://developers.google.com/actions/assistant/updates/daily) and the [Push Notifications](https://developers.google.com/actions/assistant/updates/notifications) documentation to enable daily updates and push notifications.
1. Type `Talk to my test app` in the simulator, or say `OK Google, talk to my test app` to any Actions on Google enabled device signed into your developer account.
1. To test daily updates, choose a category. After the tip, the app will show a suggestion chip to subscribe for daily updates.
1. To test push notifications, choose to hear the latest tip. After the top, the app will show
a suggestion chip to subscribe for push notifications. Add a new tip to the Firestore DB to trigger a notification to the subscribed users.

For more detailed information on deployment, see the [documentation](https://developers.google.com/actions/dialogflow/deploy-fulfillment).

## References and How to report bugs
* Actions on Google documentation: [https://developers.google.com/actions/](https://developers.google.com/actions/).
* If you find any issues, please open a bug here on GitHub.
* Questions are answered on [StackOverflow](https://stackoverflow.com/questions/tagged/actions-on-google).

## How to make contributions?
Please read and follow the steps in the CONTRIBUTING.md.

## License
See LICENSE.md.

## Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).

## Google+
Actions on Google Developers Community on Google+ [https://g.co/actionsdev](https://g.co/actionsdev).

