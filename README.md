<p align="center">
  <img src="https://s3.us-west-2.amazonaws.com/gh-assets.sarv.com/brand.svg" alt="Woot-logo" width="240" />

  <p align="center">Customer engagement suite, an open-source alternative to Intercom, Zendesk, Salesforce Service Cloud etc.</p>
</p>

<p align="center">
  <a href="https://heroku.com/deploy?template=https://github.com/sarvteam/sarvteam/tree/master" alt="Deploy to Heroku">
     <img width="150" alt="Deploy" src="https://www.herokucdn.com/deploy/button.svg"/>
  </a>
  <a href="https://marketplace.digitalocean.com/apps/sarvteam?refcode=f2238426a2a8" alt="Deploy to DigitalOcean">
     <img width="200" alt="Deploy to DO" src="https://www.deploytodo.com/do-btn-blue.svg"/>
  </a>
</p>

___

<p align="center">
  <a href="https://codeclimate.com/github/sarvteam/sarvteam/maintainability"><img src="https://api.codeclimate.com/v1/badges/e6e3f66332c91e5a4c0c/maintainability" alt="Maintainability"></a>
  <img src="https://img.shields.io/circleci/build/github/sarvteam/sarvteam" alt="CircleCI Badge">
    <a href="https://hub.docker.com/r/sarvteam/sarvteam/"><img src="https://img.shields.io/docker/pulls/sarvteam/sarvteam" alt="Docker Pull Badge"></a>
  <a href="https://hub.docker.com/r/sarvteam/sarvteam/"><img src="https://img.shields.io/docker/cloud/build/sarvteam/sarvteam" alt="Docker Build Badge"></a>
  <img src="https://img.shields.io/github/commit-activity/m/sarvteam/sarvteam" alt="Commits-per-month">
  <a title="Crowdin" target="_self" href="https://sarvteam.crowdin.com/sarvteam"><img src="https://badges.crowdin.net/e/37ced7eba411064bd792feb3b7a28b16/localized.svg"></a>
  <a href="https://discord.gg/cJXdrwS"><img src="https://img.shields.io/discord/647412545203994635" alt="Discord"></a>
  <a href="https://huntr.dev/bounties/disclose"><img src="https://cdn.huntr.dev/huntr_security_badge_mono.svg" alt="Huntr"></a>
  <a href="https://status.sarv.com"><img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsarvteam%2Fstatus%2Fmaster%2Fapi%2Fsarvteam%2Fuptime.json" alt="uptime"></a>
  <a href="https://status.sarv.com"><img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsarvteam%2Fstatus%2Fmaster%2Fapi%2Fsarvteam%2Fresponse-time.json" alt="response time"></a>
  <a href="https://artifacthub.io/packages/helm/sarvteam/sarvteam"><img src="https://img.shields.io/endpoint?url=https://artifacthub.io/badge/repository/artifact-hub" alt="Artifact HUB"></a>
</p>

<img src="https://sarvteam-public-assets.s3.amazonaws.com/github/screenshot.png" width="100%" alt="Chat dashboard"/>



SarvTeam is an open-source, self-hosted customer engagement suite. SarvTeam lets you view and manage your customer data, communicate with them irrespective of which medium they use, and re-engage them based on their profile.

## Features

SarvTeam supports the following conversation channels:

 - **Website**: Talk to your customers using our live chat widget and make use of our SDK to identify a user and provide contextual support.
 - **Facebook**: Connect your Facebook pages and start replying to the direct messages to your page.
 - **Instagram**: Connect your Instagram profile and start replying to the direct messages.
 - **Twitter**: Connect your Twitter profiles and reply to direct messages or the tweets where you are mentioned.
 - **Telegram**: Connect your Telegram bot and reply to your customers right from a single dashboard.
 - **WhatsApp**: Connect your WhatsApp business account and manage the conversation in SarvTeam.
 - **Line**: Connect your Line account and manage the conversations in SarvTeam.
 - **SMS**: Connect your Twilio SMS account and reply to the SMS queries in SarvTeam.
 - **API Channel**: Build custom communication channels using our API channel.
 - **Email**: Forward all your email queries to SarvTeam and view it in our integrated dashboard.

And more.

Other features include:

- **CRM**: Save all your customer information right inside SarvTeam, use contact notes to log emails, phone calls, or meeting notes.
- **Custom Attributes**: Define custom attribute attributes to store information about a contact or a conversation and extend the product to match your workflow.
- **Shared multi-brand inboxes**: Manage multiple brands or pages using a shared inbox.
- **Private notes**: Use @mentions and private notes to communicate internally about a conversation.
- **Canned responses (Saved replies)**: Improve the response rate by adding saved replies for frequently asked questions.
- **Conversation Labels**: Use conversation labels to create custom workflows.
- **Auto assignment**: SarvTeam intelligently assigns a ticket to the agents who have access to the inbox depending on their availability and load.
- **Conversation continuity**: If the user has provided an email address through the chat widget, SarvTeam will send an email to the customer under the agent name so that the user can continue the conversation over the email.
- **Multi-lingual support**: SarvTeam supports 10+ languages.
- **Powerful API & Webhooks**: Extend the capability of the software using SarvTeam’s webhooks and APIs.
- **Integrations**: SarvTeam natively integrates with Slack right now. Manage your conversations in Slack without logging into the dashboard.

## Documentation

Detailed documentation is available at [sarv.com/help-center](https://www.sarv.com/help-center).

## Translation process

The translation process for SarvTeam web and mobile app is managed at [https://translate.sarv.com](https://translate.sarv.com) using Crowdin. Please read the [translation guide](https://www.sarv.com/docs/contributing/translating-sarvteam-to-your-language) for contributing to SarvTeam.

## Branching model

We use the [git-flow](https://nvie.com/posts/a-successful-git-branching-model/) branching model. The base branch is `develop`.
If you are looking for a stable version, please use the `master` or tags labelled as `v1.x.x`.

## Deployment

### Heroku one-click deploy

Deploying SarvTeam to Heroku is a breeze. It's as simple as clicking this button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/sarvteam/sarvteam/tree/master)

Follow this [link](https://www.sarv.com/docs/environment-variables) to understand setting the correct environment variables for the app to work with all the features. There might be breakages if you do not set the relevant environment variables.


### DigitalOcean 1-Click Kubernetes deployment

SarvTeam now supports 1-Click deployment to DigitalOcean as a kubernetes app.

<a href="https://marketplace.digitalocean.com/apps/sarvteam?refcode=f2238426a2a8" alt="Deploy to DigitalOcean">
  <img width="200" alt="Deploy to DO" src="https://www.deploytodo.com/do-btn-blue.svg"/>
</a>

### Other deployment options

For other supported options, checkout our [deployment page](https://sarv.com/deploy). 

## Security

Looking to report a vulnerability? Please refer our [SECURITY.md](./SECURITY.md) file.


## Community? Questions? Support ?

If you need help or just want to hang out, come, say hi on our [Discord](https://discord.gg/cJXdrwS) server.


## Contributors ✨

Thanks goes to all these [wonderful people](https://www.sarv.com/docs/contributors):

<a href="https://github.com/sarvteam/sarvteam/graphs/contributors"><img src="https://opencollective.com/sarvteam/contributors.svg?width=890&button=false" /></a>


*SarvTeam* &copy; 2017-2023, SarvTeam Inc - Released under the MIT License.
