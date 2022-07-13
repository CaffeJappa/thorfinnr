const cores = require("../../json/cores.json");
const Discord = require("discord.js");
const gifs = require("../../json/abgifs.json")

module.exports.run = async (bot, message, args) => {
    let gif = gifs;
    let pegar = gif[Math.floor(Math.random() * gif.length)];

    let embed = new Discord.MessageEmbed()
    .setColor(cores.dourado)
    .setImage(pegar)

    if(!args[0]) return message.channel.send(`Mencione alguém!`);
    if(args[0]) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send("Mencione alguém!");
        embed.setTitle(`${message.author.username} abraçou ${bot.users.cache.get(user.id).username}!`);
    }

    message.channel.send(embed);
}

module.exports.help = {
    name: "abraçar",
    aliases: ["abs"],
    description: "Abraça alguém.",
    use: "[Usuário]",
    category: "geral"
}
