const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(message.mentions.members.first() || bot.users.cache.get(args[0])) {
    const user = message.mentions.users.first()
    let embedu = new Discord.MessageEmbed()
    .setImage(user.displayAvatarURL());
    message.channel.send(embedu);
  } else {
    let embedu = new Discord.MessageEmbed()
    .setImage(message.author.displayAvatarURL());
    message.channel.send(embedu);
  }

}

module.exports.help = {
  name: "avatar",
  aliases: ["av", "pfp", "foto"],
  description: "Mostrará o teu avatar ou de alguém marcado.",
  category: "geral",
  use: "[Usuário]"
}
