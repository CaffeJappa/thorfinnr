const Discord = require("discord.js");
const gifs = require("../../json/beijos.json");
const cores = require("../../json/cores.json");

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
      embed.setTitle(`${message.author.username} beijou ${bot.users.cache.get(user.id).username}!`);
  }

  message.channel.send(embed);
}

module.exports.help = {
  name: "beijar",
  aliases: ["bj"],
  description: "Beijará a pessoa mencionada. Útil no RP",
  category: "geral"
}
