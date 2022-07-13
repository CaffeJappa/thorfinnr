const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let canal = "996515869633040535";
  const sayMessage = args.join(` `);
  if(message.attachments.size > 0) {
    if(canal) {
      let embed = new Discord.MessageEmbed()
      embed.setAuthor(`${message.author.username} ✔️`, message.author.displayAvatarURL());
      embed.setColor("#1DA1F2");
      embed.setDescription(`${sayMessage}\n\n`);
      embed.setImage(message.attachments)
      embed.setTimestamp()
      embed.setFooter("Twitter - Le Républicain ©", bot.user.displayAvatarURL());
      bot.channels.cache.get(canal).send(embed).then(message => {
        message.react('❤️')
          .then(() => message.react('🔁'))
          .catch(() => console.error('Falha.'));
        });

      }
  } else {
  if(canal) {

    let embed = new Discord.MessageEmbed()
    embed.setAuthor(`${message.author.username} ✔️`, message.author.displayAvatarURL());
    embed.setColor("#1DA1F2");
    embed.setDescription(`${sayMessage}\n\n`);
    embed.setTimestamp()
    embed.setFooter("Twitter - Le Républicain ©", bot.user.displayAvatarURL());
    bot.channels.cache.get(canal).send(embed).then(message => {
      message.react('❤️')
        .then(() => message.react('🔁'))
        .catch(() => console.error('Falha.'));
      });
    }
  }
  message.delete().catch(O_o=>{});
}

module.exports.help = {
  name: "tweet",
  aliases: ["tt", "fl"],
  description: "Tweetará uma mensagem.",
  category: "geral",
  use: "[Mensagem]"
}
