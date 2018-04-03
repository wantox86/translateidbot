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

// Matches "/echo [whatever]"
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const chatMsg = msg.text;

    helper.printLogTeleIncomming(msg);
    var splitedMsg = chatMsg.split(" ")[0];
    var reply = "silakan ketik kalimat yang akan di translate pada chat room dibawah"
        + " atau untuk pilihan lainnya dengan command seperti dibawah ini\n"
        + "  <code>/t </code>   : translate detek otomatis ke bahasa Indonesia\n"
        + "              contoh => <code>/t goat</code> \n"
        + "  <code>/ti </code> : translate dari bahasa Inggris ke bahasa Indonesia\n"
        + "              contoh => <code>/ti goat</code> \n"
        + "  <code>/te </code> : translate dari bahasa Indonesia ke bahasa Inggris\n"
        + "              contoh => <code>/te kambing</code> \n"
        + "  <code>/tc [kode_bahasa_1] [kode_bahasa_2]</code> : translate dari bahasa 1 ke bahasa 2\n"
        + "              contoh => <code>/tc id en kambing</code>\n"
        + "              contoh diatas translate dari indonesia ke inggris\n"
        + "              untuk daftar bahasa bisa dilihat dengan command <code> /list</code>\n\n"
        + "untuk bantuan daftar command silakan ketik <code>/help </code>\n\n"
        + "ada feedback ? pertanyan ? lapor bugs ? dan lainnya silakan gunakan command <code>/feedback [feedback_anda] </code> \n"
        + "atau email ke <code>translateid.telegram.bot@gmail.com</code>\n\n"
        + "suka dengan bot ini ? silakan beri rating di https://storebot.me/bot/translateid_bot \n\n"
        + "-----------------------------------------\n\n"
        + "Welcome to Bot Translate Indonesia\n"
        + "Please type a sentence that will be in translate at below chat room"
        + " or for other option with command like below\n"
        + "  <code>/t </code>   : translate automatic detect to Indonesian\n"
        + "              example => <code>/t goat</code> \n"
        + "  <code>/ti </code> : translate from English to Indonesian\n"
        + "              example => <code>/ti goat</code> \n"
        + "  <code>/te </code> : translate from Indonesian to English\n"
        + "              example => <code>/te kambing</code> \n"
        + "  <code>/tc [language_code_1] [language_code_2]</code> : translate from language 1 to language 2\n"
        + "              example => <code>/tc id en kambing</code> \n"
        + "              above sample for translate from Indonesian to English\n"
        + "              for list of language code, just type command <code> /list</code>\n\n"
        + "For help list command please type <code>/help </code>\n\n"
        + "Question? Report bugs? And others just type command <code>/feedback [your_feedback] </code> \n"
        + "or email to <code>translateid.telegram.bot@gmail.com</code>\n\n"
        + "Like this bot? Please rate it at https://storebot.me/bot/translateid_bot \n\n"
        + "Enjoy your life.. @TranslateID_Bot";

    var listlang = " af	--> Afrikaans \n"
    + " sq	--> Albanian \n"
    + " am	--> Amharic \n"
    + " ar	--> Arabic \n"
    + " hy	--> Armenian \n"
    + " az	--> Azeerbaijani \n"
    + " eu	--> Basque \n"
    + " be	--> Belarusian \n"
    + " bn	--> Bengali \n"
    + " bs	--> Bosnian \n"
    + " bg	--> Bulgarian \n"
    + " ca	--> Catalan \n"
    + " ceb	--> Cebuano \n"
    + " cn 	--> Chinese (Simplified) \n"
    + " tw 	--> Chinese (Traditional) \n"
    + " co	--> Corsican \n"
    + " hr	--> Croatian \n"
    + " cs	--> Czech \n"
    + " da	--> Danish \n"
    + " nl	--> Dutch \n"
    + " en	--> English \n"
    + " eo	--> Esperanto \n"
    + " et	--> Estonian \n"
    + " fi	--> Finnish \n"
    + " fr	--> French \n"
    + " fy	--> Frisian \n"
    + " gl	--> Galician \n"
    + " ka	--> Georgian \n"
    + " de	--> German \n"
    + " el	--> Greek \n"
    + " gu	--> Gujarati \n"
    + " ht	--> Haitian Creole \n"
    + " ha	--> Hausa \n"
    + " haw --> Hawaiian \n"
    + " iw	--> Hebrew \n"
    + " hi	--> Hindi \n"
    + " hmn --> Hmong \n"
    + " hu	--> Hungarian \n"
    + " is	--> Icelandic \n"
    + " ig	--> Igbo \n"
    + " id	--> Indonesian \n"
    + " ga	--> Irish \n"
    + " it	--> Italian \n"
    + " ja	--> Japanese \n"
    + " jw	--> Javanese \n"
    + " kn	--> Kannada \n"
    + " kk	--> Kazakh \n"
    + " km	--> Khmer \n"
    + " ko	--> Korean \n"
    + " ku	--> Kurdish \n"
    + " ky	--> Kyrgyz \n"
    + " lo	--> Lao \n"
    + " la	--> Latin \n"
    + " lv	--> Latvian \n"
    + " lt	--> Lithuanian \n"
    + " lb	--> Luxembourgish \n"
    + " mk	--> Macedonian \n"
    + " mg	--> Malagasy \n"
    + " ms	--> Malay \n"
    + " ml	--> Malayalam \n"
    + " mt	--> Maltese \n"
    + " mi	--> Maori \n"
    + " mr	--> Marathi \n"
    + " mn	--> Mongolian \n"
    + " my	--> Myanmar (Burmese) \n"
    + " ne	--> Nepali \n"
    + " no	--> Norwegian \n"
    + " ny	--> Nyanja (Chichewa) \n"
    + " ps	--> Pashto \n"
    + " fa	--> Persian \n"
    + " pl	--> Polish \n"
    + " pt	--> Portuguese \n"
    + " pa	--> Punjabi \n"
    + " ro	--> Romanian \n"
    + " ru	--> Russian \n"
    + " sm	--> Samoan \n"
    + " gd	--> Scots Gaelic \n"
    + " sr	--> Serbian \n"
    + " st	--> Sesotho \n"
    + " sn	--> Shona \n"
    + " sd	--> Sindhi \n"
    + " si	--> Sinhala (Sinhalese) \n"
    + " sk	--> Slovak \n"
    + " sl	--> Slovenian \n"
    + " so	--> Somali \n"
    + " es	--> Spanish \n"
    + " su	--> Sundanese \n"
    + " sw	--> Swahili \n"
    + " sv	--> Swedish \n"
    + " tl	--> Tagalog (Filipino) \n"
    + " tg	--> Tajik \n"
    + " ta	--> Tamil \n"
    + " te	--> Telugu \n"
    + " th	--> Thai \n"
    + " tr	--> Turkish \n"
    + " uk	--> Ukrainian \n"
    + " ur	--> Urdu \n"
    + " uz	--> Uzbek \n"
    + " vi	--> Vietnamese \n"
    + " cy	--> Welsh \n"
    + " xh	--> Xhosa \n"
    + " yi	--> Yiddish \n"
    + " yo	--> Yoruba \n"
    + " zu	--> Zulu \n";

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

              sbRet = new StringBuilder();
              sbRet.append("New Registered User!! \n");
              sbRet.append("User     : ").append(msg.from.first_name).append(" ").append(msg.from.last_name).append("\n");
              sbRet.append("UserID   : ").append(msg.from.username).append("\n");
              sbRet.append("chat_id  : ").append(msg.chat.id).append("\n");
              var reply_to_message = {parse_mode: "HTML"};
              bot.sendMessage(config.chat_id_WS, sbRet.toString(), reply_to_message);
            }
            else
            {
              helper.printLogError('failed insert chat id ' + msg.chat.id + ' to database');
            }
          });
        }
      });
    }
    else if(splitedMsg == "/list")
    {
      listlang = "List Language Code\n\n"
        + listlang;
        var reply_to_message = {parse_mode: "HTML"};
        bot.sendMessage(chatId, listlang, reply_to_message);
        helper.printLogTeleOutgoing(msg,listlang);
    }
    else if(splitedMsg == "/t")
    {
      // var googleTranslate = require('google-translate')("AIzaSyBLLzWvuUnN7yvjZpZb0wFBylQ76Jl6kUM");
      // googleTranslate.translate('My name is Brandon', 'id', function(err, translation) {
      //   console.log(translation);
      // });
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
      // var googleTranslate = require('google-translate')("AIzaSyBLLzWvuUnN7yvjZpZb0wFBylQ76Jl6kUM");
      // googleTranslate.translate('My name is Brandon', 'id', function(err, translation) {
      //   console.log(translation);
      // });
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
      // var googleTranslate = require('google-translate')("AIzaSyBLLzWvuUnN7yvjZpZb0wFBylQ76Jl6kUM");
      // googleTranslate.translate('My name is Brandon', 'id', function(err, translation) {
      //   console.log(translation);
      // });
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
    else if(splitedMsg == "/tc")
    {
      var sbRet = new StringBuilder();
      var splitTC = chatMsg.split(" ");
      var language_code_1 = splitTC[1];
      var language_code_2 = splitTC[2];
      splitTC.splice(0,3);
      var msgTC = splitTC.join(" ");
      if(language_code_1 == "cn")
      {
        language_code_1 = "zh-CN";
      } 
      else if(language_code_1 == "tw")
      {
        language_code_1 = "zh-TW";
      }
      if(language_code_2 == "cn")
      {
        language_code_2 = "zh-CN";
      } 
      else if(language_code_2 == "tw")
      {
        language_code_2 = "zh-TW";
      }
      translate(msgTC, {from: language_code_1, to: language_code_2}).then(res => 
      {
        sbRet.append("Translate ["+language_code_1+"] to ["+language_code_2+"]").append("\n");
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
        sbRet.append("ChatID   : ").append(msg.chat.id).append("\n");
        sbRet.append("Feedback : ").append(chatMsg.substring(10)).append("\n");
        bot.sendMessage(config.chat_id_WS, sbRet.toString());
      });
    }
    else if(splitedMsg == "/about")
    {
      var sbRet = new StringBuilder();
      sbRet.append("Created by ").append("\n");
      sbRet.append("Programmer : Wawan Setiawan ").append("\n");
      sbRet.append("Designer   : Febri Prastyo ").append("\n");
      sbRet.append("translateid.telegram.bot@gmail.com\n");
      sbRet.append("2017");
      var reply_to_message = {reply_to_message_id: msg.message_id};
      bot.sendMessage(msg.chat.id, sbRet.toString(), reply_to_message);
      helper.printLogTeleOutgoing(msg, sbRet.toString());
    }
    else if(splitedMsg == "/b")
    {
      if(msg.chat.id == config.chat_id_WS)
      {
        helper.printLogDebug("New Broadcast : ");
        helper.printLogDebug(chatMsg.substring(3));
        var jsonDataParam =
        {
            chatid: '-1'
        };
        botModel.find_all_user_bot(jsonDataParam, function(status,jsonResult)
        {
            var lengthResult = jsonResult.length;
            if(lengthResult > 0)
            {
                for(var i = 0;i < lengthResult; i++)
                {
                    var reply = "Hi " + jsonResult[i].first_name + "\n"
                        + chatMsg.substring(3);
                    var reply_to_message = {parse_mode: "HTML"};
                    bot.sendMessage(jsonResult[i].chat_id, reply, reply_to_message);
                    helper.printLogDebug("Send to --> " + jsonResult[i].chat_id);
                }
            };
        });
      }
    }
    else if(splitedMsg == "/prv")
    {
      if(msg.chat.id == config.chat_id_WS)
      {
        var splitedMsgFull = chatMsg.split(" ");
        var chat_id = splitedMsgFull[1];
        splitedMsgFull.splice(0,2);
        var msgPrv = splitedMsgFull.join(" ");
        helper.printLogDebug("New Private Msg to : " + chat_id);
        helper.printLogDebug(msgPrv);
        var jsonDataParam =
        {
          chatid: chat_id
        };
        botModel.find_all_user_bot(jsonDataParam, function(status,jsonResult)
        {
            var lengthResult = jsonResult.length;
            if(lengthResult > 0)
            {
              var reply = "Hi " + jsonResult[0].first_name + "\n"
                  + msgPrv;
              var reply_to_message = {parse_mode: "HTML"};
              bot.sendMessage(jsonResult[0].chat_id, reply, reply_to_message);
              helper.printLogDebug("Send to --> " + jsonResult[0].chat_id);
            };
        });
      }
    }
    else if(splitedMsg == "/cmd")
    {
      const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
          keyboard: [
            ['/t'],
            ['/ti'],
            ['/te'],
            ['/help'],
            ['/list']
          ]
        })
      };
      bot.sendMessage(msg.chat.id, 'Silakan pilih command ?', opts);
      helper.printLogTeleOutgoing(str);
    }
    else
    {
      var sbRet = new StringBuilder();
      translate(chatMsg, {to: 'id'}).then(res => 
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
    // else if(splitedMsg == "/print")
    // {
    //   var data = {
    //     "1":{"1":"k","2":"a","3":"m","4":"b","5":"i","6":"n","7":"g","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":""},
    //     "2":{"1":"","2":"","3":"","4":"a","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":""},
    //     "3":{"1":"","2":"","3":"","4":"d","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":""},
    //     "4":{"1":"","2":"","3":"t","4":"a","5":"p","6":"i","7":"r","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":""},
    //     "5":{"1":"","2":"","3":"","4":"k","5":"","6":"b","7":"u","8":"a","9":"y","10":"a","11":"","12":"","13":"","14":"","15":""},
    //     "6":{"1":"","2":"","3":"","4":"","5":"k","6":"","7":"s","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":""},
    //     "7":{"1":"","2":"","3":"","4":"","5":"a","6":"y","7":"a","8":"m","9":"","10":"","11":"","12":"","13":"","14":"","15":""},
    //     "8":{"1":"","2":"","3":"k","4":"","5":"d","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":""},
    //     "9":{"1":"","2":"","3":"u","4":"","5":"a","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":""},
    //     "10":{"1":"k","2":"u","3":"d","4":"a","5":"l","6":"a","7":"u","8":"t","9":"","10":"","11":"","12":"","13":"","14":"","15":""},
    //     "11":{"1":"o","2":"","3":"a","4":"","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":""},
    //     "12":{"1":"d","2":"","3":"","4":"","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":""},
    //     "13":{"1":"o","2":"","3":"","4":"","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":""},
    //     "14":{"1":"k","2":"","3":"","4":"","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":""},
    //     "15":{"1":"k","2":"","3":"","4":"","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":""}
    //     };
    //   sb.append("`");
    //   sb.append("----------------------------\n");
    //   for(var i=1;i < 16;i++)
    //   {
    //     for(var j=1;j<15;j++)
    //     {
    //       if(j==1)
    //       {
    //         var str = data["" + i]["" + j];
    //         if(str=="")
    //         {
    //           str = "*";
    //         }
    //         sb.append("|").append(str).append("|");
    //       }
    //       else
    //       {
    //         var str = data["" + i]["" + j];
    //         if(str=="")
    //         {
    //           str = "*";
    //         }
    //         sb.append("" + str).append("|");
    //       }
    //     }
    //     sb.append("---------------------------\n");
    //   }
    //   sb.append("`");
    //   var reply_to_message = {parse_mode: "Markdown"};
    //   bot.sendMessage(chatId, sb.toString(), reply_to_message);
    // }
    
});

// bot.onText(/\/cmd/, function onLoveText(msg) {
//   const opts = {
//     reply_to_message_id: msg.message_id,
//     reply_markup: JSON.stringify({
//       keyboard: [
//         ['/t'],
//         ['/ti'],
//         ['/te'],
//         ['/help'],
//         ['/list']
//       ]
//     })
//   };
//   bot.sendMessage(msg.chat.id, 'Silakan pilih command ?', opts);
//   helper.printLogTeleOutgoing(str);
// });


