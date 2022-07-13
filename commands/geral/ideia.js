const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    const conteúdo = args.join(" ");

    if(!args[0]) {
        return message.channel.send("Digite algo!")
    } else if(message.content.length > 1000) {
        return message.channel.send("Mensagem muito grande!");
    } else {
        var canal = message.guild.channels.cache.find(ch => ch.name === "sugestões");
        const msg = await canal.send(
            new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor("#FFD700")
            .addField("Enquete:", conteúdo)
            .setFooter(`© ${message.guild.me.displayName}`, bot.user.displayAvatarURL())
            .setTimestamp()
        );
        await message.channel.send(`${message.author} a tua sugestão foi enviada com sucesso!`)

        await msg.react(bot.emojis.cache.get("763084441228673064"));
        await msg.react(bot.emojis.cache.get("763084446223958066"));
    }
}

module.exports.help = {
    name: "ideia",
    aliases: ["sg", "i"],
    description: "Enviará uma idéia para nós.",
    use: "[Ideia]",
    category: "geral"
}
