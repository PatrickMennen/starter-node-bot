var Botkit = require('botkit');
var wit = require('node-wit');
var token = 'SRHS46GUPVLERG6MP65SYX33JHFKXRNM';

// Expect a SLACK_TOKEN environment variable
var slackToken = process.env.SLACK_TOKEN
if (!slackToken) {
  console.error('SLACK_TOKEN is required!')
  process.exit(1)
}

var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: slackToken
});

bot.startRTM(function (err, bot, payload) {
  if (err) {
    throw new Error('Could not connect to Slack')
  }
});

controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
  wit.captureTextIntent(token, message, function(err, result) {
    if (err) {
      bot.reply('I am sorry, the following error occured: `'  +  err + '`');
    }
    else {
      bot.reply(JSON.stringify(res, null, ' '));
    }
  });
});