
var bot;
module.exports =
{
  getBot: function()
  {
    return bot;
  },
  setBot: function(bot_param)
  {
    bot = bot_param;
  }
};