const TelegramBot = require('node-telegram-bot-api');
var helper = require('../../CommonHelper');
var config = require('../../config/config').config;
var StringBuilder = require("string-builder");
var sb = new StringBuilder();
const translate = require('google-translate-api');
var botLib = require('../../lib/botlib');
var myBot = require('../../model/bot');
var botModel = new myBot();



// replace the value below with the Telegram token you receive from @BotFather
const token = config.token_bot;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

botLib.setBot(bot);

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const chatMsg = msg.text;

    helper.printLogTeleIncomming(msg);
    var splitedMsg = chatMsg.split(" ")[0];
    var reply = "silakan ketik kalimat yang akan di translate dengan command seperti dibawah ini\n"
        + "  <code>/t </code>   : translate detek otomatis ke bahasa Indonesia\n"
        + "              contoh => <code>/t goat</code> \n"
        + "  <code>/ti </code> : translate dari bahasa Inggris ke bahasa Indonesia\n"
        + "              contoh => <code>/ti goat</code> \n"
        + "  <code>/te </code> : translate dari bahasa Indonesia ke bahasa Inggris\n"
        + "              contoh => <code>/te kambing</code> \n\n"
        + "untuk bantuan daftar command silakan ketik <code>/help </code>\n\n"
        + "ada feedback ? pertanyan ? lapor bugs ? dan lainnya silakan gunakan command <code>/feedback [feedback_anda] </code> \n"
        + "atau email ke <code>translateid.telegram.bot@gmail.com</code>\n\n"
        + "suka dengan bot ini ? silakan beri rating di https://storebot.me/bot/translateid_bot \n\n"
        + "-----------------------------------------\n\n"
        + "Welcome to Bot Translate Indonesia\n"
        + "Please type a sentence that will be in translate with command like below\n"
        + "  <code>/t </code>   : translate automatic detect to Indonesian\n"
        + "              example => <code>/t goat</code> \n"
        + "  <code>/ti </code> : translate from English to Indonesian\n"
        + "              example => <code>/ti goat</code> \n"
        + "  <code>/te </code> : translate from Indonesian to English\n"
        + "              example => <code>/te kambing</code> \n\n"
        + "For help list command please type <code>/help </code>\n\n"
        + "Question? Report bugs? And others just type command <code>/feedback [your_feedback] </code> \n"
        + "or email to <code>translateid.telegram.bot@gmail.com</code>\n\n"
        + "Like this bot? Please rate it at https://storebot.me/bot/translateid_bot \n\n"
        + "Enjoy your life.. @TranslateID_Bot";

    if(splitedMsg == "/help")
    {
      reply = "Hai " + msg.from.first_name + "\n\n"
        + reply;
        var reply_to_message = {parse_mode: "HTML"};
        bot.sendMessage(chatId, reply, reply_to_message);
        helper.printLogTeleOutgoing(msg,reply);
    }
    else if(splitedMsg == "/start")
    {
      reply = "Hai " + msg.from.first_name +  "\n\n"
        + "Selamat datang di Bot Translate Indonesia \n"
        + reply;
      var reply_to_message = {parse_mode: "HTML"};
      bot.sendMessage(msg.chat.id, reply, reply_to_message);
      helper.printLogTeleOutgoing(msg, reply);
      helper.printLogDebug('Checking chat id ' + msg.chat.id + ' on database');
      var jsonParam = 
      {
        chatid : msg.chat.id
      };
      botModel.find_all_user_bot(jsonParam, function(status, jsonData)
      {
        if(!jsonData[0] )
        {
          var jsonParamInsert = 
          {
            chat_id: msg.chat.id,
            first_name: msg.from.first_name,
            last_name: msg.from.last_name,
            user_name: msg.from.username,
            creationtimestamp: new Date()
          };
          botModel.insert_userbot(jsonParamInsert, function(status, jsonData)
          {
            if(status == 0)
            {
              helper.printLogDebug('success insert chat id ' + msg.chat.id + ' to database');
            }
            else
            {
              helper.printLogError('failed insert chat id ' + msg.chat.id + ' to database');
            }
          });
        }
      });
    }
    else if(splitedMsg == "/t")
    {

      var sbRet = new StringBuilder();
      translate(chatMsg.substring(3), {to: 'id'}).then(res => 
      {
        sbRet.append("Detek Bahasa : ").append(res.from.language.iso).append("\n");
        sbRet.append("=> ").append(res.text);
        var reply_to_message = {reply_to_message_id: msg.message_id};
        bot.sendMessage(msg.chat.id, sbRet.toString(), reply_to_message);
        helper.printLogTeleOutgoing(msg, sbRet.toString());
      }).catch(err => {
          console.error(err);
      });
    }
    else if(splitedMsg == "/ti")
    {
      var sbRet = new StringBuilder();
      translate(chatMsg.substring(4), {from: 'en', to: 'id'}).then(res => 
      {
        sbRet.append("Translate [en] English to [id] Indonesia").append("\n");
        sbRet.append("=> ").append(res.text);
        var reply_to_message = {reply_to_message_id: msg.message_id};
        bot.sendMessage(msg.chat.id, sbRet.toString(), reply_to_message);
        helper.printLogTeleOutgoing(msg, sbRet.toString());
      }).catch(err => {
          console.error(err);
      });
    }
    else if(splitedMsg == "/te")
    {
      var sbRet = new StringBuilder();
      translate(chatMsg.substring(4), {from: 'id', to: 'en'}).then(res => 
      {
        sbRet.append("Translate [id] Indonesia to [en] English").append("\n");
        sbRet.append("=> ").append(res.text);
        var reply_to_message = {reply_to_message_id: msg.message_id};
        bot.sendMessage(msg.chat.id, sbRet.toString(), reply_to_message);
        helper.printLogTeleOutgoing(msg, sbRet.toString());
      }).catch(err => {
          console.error(err);
      });
    }
    else if(splitedMsg == "/feedback")
    {
      var sbRet = new StringBuilder();
      param = 
      {
        first_name: msg.from.first_name, 
        last_name: msg.from.last_name, 
        user_id: msg.from.username, 
        feedback_msg: chatMsg.substring(10), 
        create_timestamp: new Date()
      };

      botModel.insert_feedback(param, function(status,jsonData)
      {
        sbRet.append("Feedback anda telah kami terima. terima kasih atas feedback yang anda berikan.")
        var reply_to_message = {reply_to_message_id: msg.message_id};
        bot.sendMessage(msg.chat.id, sbRet.toString(), reply_to_message);

        helper.printLogTeleOutgoing(msg, sbRet.toString());
        
        sbRet = new StringBuilder();
        sbRet.append("New Feedback!! \n");
        sbRet.append("User     : ").append(msg.from.first_name).append(" ").append(msg.from.last_name).append("\n");
        sbRet.append("UserID   : ").append(msg.from.username).append("\n");
        sbRet.append("Feedback : ").append(chatMsg.substring(10)).append("\n");
        bot.sendMessage(config.chat_id_WS, sbRet.toString());
      });
    }
    else if(splitedMsg == "/about")
    {
      var sbRet = new StringBuilder();
      sbRet.append("Created by Wawan S").append("\n");
      sbRet.append("translateid.telegram.bot@gmail.com\n");
      sbRet.append("2017");
      var reply_to_message = {reply_to_message_id: msg.message_id};
      bot.sendMessage(msg.chat.id, sbRet.toString(), reply_to_message);
      helper.printLogTeleOutgoing(msg, sbRet.toString());
    }    
});

bot.onText(/\/cmd/, function onLoveText(msg) {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ['/t'],
        ['/ti'],
        ['/te'],
        ['/help']
      ]
    })
  };
  bot.sendMessage(msg.chat.id, 'Silakan pilih command ?', opts);
  helper.printLogTeleOutgoing(str);
});


