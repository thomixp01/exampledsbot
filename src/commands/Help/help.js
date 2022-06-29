const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    aliases: ["ayuda"],
    category: "Help", //debe ser el mismo q el nombre de la carpeta actual de este comando
    cooldown: 2,
    run: async (bot, message, args) => {
        let UtilsCommands = bot.commands.filter((cmd) => cmd.category === 'Utils');


        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor({ name: message.author.username.toString(), iconURL: message.author.displayAvatarURL({dynamic: true}) })
		.setTitle("📂 Comandos")
        .setDescription('Los comandos estarán divididos por categoría:')
        .addField(`🔹 Utilidades [${UtilsCommands.size}]:`, '**`'+UtilsCommands.map(cmd => cmd.name).join(' | ')+'`**')
        .setColor("AQUA")
        .setTimestamp()

        message.channel.send({ embeds: [helpEmbed] });
    }
}