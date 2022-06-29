const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "test",
    aliases: ["ej", "ejemplo"],
    category: "Utils", //debe ser el mismo q el nombre de la carpeta actual de este comando
    cooldown: 2,
    run: async (bot, message, args) => {
        message.reply("Este es un ejemplo de comando");
    }
}
