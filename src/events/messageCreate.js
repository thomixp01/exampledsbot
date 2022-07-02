const Discord = require('discord.js');
const Collection = require('discord.js').Collection;
const readdirSync = require('fs').readdirSync;
const MessageEmbed = require('discord.js').MessageEmbed;
module.exports = {
    name: "messageCreate",
    emiter: "on",
    run: (bot, message) => {
        if (message.author.bot || message.channel.type === 'dm') return;

        const prefix = bot.config.prefix;

        if (!message.content.startsWith(prefix)) {
            let args = message.content.trim().split(/ +/g);
            //Funciones on/off
            return;
        }

        const command = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
        const args = message.content.split(' ').slice(1);
        let cmd;

        if (bot.commands.has(command)) { cmd = bot.commands.get(command) }  //command name
        else if(bot.aliases.has(command)) { cmd = bot.commands.get(bot.aliases.get(command)) } //alias command

        //Verificacion de si existe este comando
        if (!cmd){
            const ErrorCommand = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Error')
                .setDescription('El comando no existe')

            message.channel.send({ embeds: [ErrorCommand] });
            return;
        }

        const props = require(`../commands/${cmd.category}/${cmd.name}`);

        // COOLDOWNS
        if (!cooldowns.has(props.name)) { cooldowns.set(props.name, new Collection()); }
        const now = Date.now();
        const timestamps = cooldowns.get(props.name);
        const cooldownAmount = (props.cooldown || 2) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Espera ${timeLeft.toFixed(1)}${timeLeft.toFixed(1)<2 ? '' : '´s'} para usar **${props.name}**`);
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        //OWNER COMMANDS
        let owneronoff = props.onlyowner;
        let msgid = message.author.id;
        if (owneronoff === true) {
            if (msgid.toString() === bot.config.ownerid) {
                cmd.run(bot, message, args).catch (err => bot.emit("error", err, message));
                return;
            }
            const ErrorOwnerID = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('ERROR')
            .setDescription('Este comando esta permitido solo para desarolladores')

            message.channel.send({ embeds: [ErrorOwnerID] });
            return;
        }

        // Iniciar Comando
        cmd.run(bot, message, args).catch (err => bot.emit("error", err, message));
    }
}