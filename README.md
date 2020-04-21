# Mood Tracker Application (Twilio Hackathon Submission)

## About
Name TBD: Twilio Hackathon Project Entry using SMS and a web app to track mood trends while in quarantine and allowing for ways, via SMS, to reach out to others for help

## Set up

### Requirements

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://link/to/postgres)
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)

### Twilio Account Settings

This application should give you a ready-made starting point for writing your
own appointment reminder application. Before we begin, we need to collect
all the config values we need to run the application:

| Config&nbsp;Value | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account&nbsp;Sid  | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console).                                                         |
| Auth&nbsp;Token   | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console).                                                         |
| Phone&nbsp;number | A Twilio phone number in [E.164 format](https://en.wikipedia.org/wiki/E.164) - you can [get one here](https://www.twilio.com/console/phone-numbers/incoming) |

### Local development

After the above requirements have been met:

1. Clone this repository and `cd` into it

```bash
git clone git@github.com:jaysonjphillips/mood-tracker-app.git
cd mood-tracker-app
```

2. Install dependencies

```bash
yarn
```

3. Set your environment variables

```bash
yarn bootstrap 
```

See [Twilio Account Settings](#twilio-account-settings) to locate the necessary environment variables.

4. Run the application

```bash
yarn develop
```


5. Navigate to [http://localhost:3000](http://localhost:3000)

That's it!

### Coding Standards

TODO: 
- Add specific linter strategies and approaches here. 
- Add command for running all linting/code checks and indivudual ones as well

### Tests

You can run the tests locally by typing:

```bash
yarn test
```

### Cloud deployment

Additionally to trying out this application locally, you can deploy it to a variety of host services. Here is a small selection of them.

Please be aware that some of these might charge you for the usage or might make the source code for this application visible to the public. When in doubt research the respective hosting service first.

| Service                           |                                                                                                                                                                                                                           |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Heroku](https://www.heroku.com/) | [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)                                                                                                                                       |
| [Glitch](https://glitch.com)      | [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/clone-from-repo?REPO_URL=https://github.com/twilio-labs/sample-template-nodejs.git) |
| [Zeit](https://zeit.co/)          | [![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/new/project?template=https://github.com/twilio-labs/sample-template-nodejs/tree/master)                                                                 |


## Contributing

TBD
(TODO: Establish Code of Conduct, Contributors Policy)

[Visit the project on GitHub]()

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as is.
