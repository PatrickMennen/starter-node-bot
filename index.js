var Botkit = require('botkit');
var wit = require('node-wit');
var token = 'QZENIHIY3F6D2GIYMJ67SCB6NFWDYJ5T';


// Expect a SLACK_TOKEN environment variable
var slackToken = process.env.SLACK_TOKEN;
if (!slackToken) {
  console.error('SLACK_TOKEN is required!');
  process.exit(1);
}

var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: slackToken
});

bot.startRTM(function (err, bot, payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});

controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "I'm here!");
});

controller.hears('.*', ['mention'], function (bot, message) {
  bot.reply(message, 'You really do care about me. :heart:');
});

controller.hears('help', ['direct_message', 'direct_mention'], function (bot, message) {
  var help = 'I will respond to the following messages: \n' +
      '`bot hi` for a simple message.\n' +
      '`bot attachment` to see a Slack attachment message.\n' +
      '`@<your bot\'s name>` to demonstrate detecting a mention.\n' +
      '`bot help` to see this again.';
  bot.reply(message, help);
});

controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
  wit.captureTextIntent(token, message, function(error, result) {
    if (err) { 
      bot.reply('What\'s all this: `' + error + '`');
      return;
    }
    bot.reply('You said `' + message + '` and I received' + result);
  });
  // bot.reply(message, 'Sorry <@' + message.user + '>, I don\'t understand. \n')
});