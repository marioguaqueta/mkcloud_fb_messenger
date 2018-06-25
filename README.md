# Journey Builder
## Custom Activities - Desk.com API

This nodejs app is a Journey Builder Application Extension containing web request to a extenal SMS Notification Service.

It't necessary create a .env file with Credentials data, for example:

- USERNAME=<YOUR_USERNAME_SMS_NOTIFICATION>
- PASSWORD=<YOUR_PASSWORD_SMS_NOTIFICATION>
- ENDPOINT=<YOUR_ENDPOINT_SMS_NOTIFICATION>
- NODE_ENV=dev
- APP_ID=<YOUR_MARKETING_CLOUD_APP_ID>
- CLIENT_ID=<YOUR_MARKETING_CLOUD_CLIENT_ID>
- CLIENT_SECRET=<YOUR_MARKETING_CLOUD_CLIENT_SECRET>
- APP_SIGNATURE=<YOUR_MARKETING_CLOUD_APP_SIGNATURE>
- AUTH_URL=<YOUR_MARKETING_CLOUD_AUTH_URL>

The front-end application is located in /public folder, where it's neccesary modify config.json with your our properties:

- inArguments
- applicationExtensionKey
- url