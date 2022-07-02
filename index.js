const Discord = require('discord.js');
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = require("./config.js");
const prefix = config.PREFIX;
const TOKEN = require("../Token.js").TOKENEXAMPLEBOT; //Token de discord bot

const fs = require('fs');
const { readdirSync } = require('fs');

//SET COLLECTION
bot.onlyowner = new Collection();
bot.aliases = new Collection();
bot.commands = new Collection();
bot.config = { prefix: config.PREFIX, ownerid: config.OWNER }// El prefix de tu bot
cooldowns = new Collection();


// Commands


for (const subFolder of readdirSync(`${__dirname}/src/commands/`)) {
    for (const fileName of readdirSync(`${__dirname}/src/commands/${subFolder}/`)) {
        let file = require(`${__dirname}/src/commands/${subFolder}/${fileName}`);

        bot.commands.set(file.name, file);
        file.aliases.forEach(alias => {
          bot.aliases.set(alias, file.name);
      });

    }
  }
  // Events


  for (const fileName of readdirSync(`${__dirname}/src/events/`)) {
    let file = require(`${__dirname}/src/events/${fileName}`);
    let eventEmiter = file.emiter;
    bot[eventEmiter](file.name, file.run.bind(null, bot));
  }

//Login del bot
bot.login(TOKEN).then(function(res) {
    bot.user.setStatus('online');
    bot.user.setActivity(`Actividad de ejemplo`);
  });