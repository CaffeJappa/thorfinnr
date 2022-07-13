const gifs = require("../../json/café.json");
const Discord = require("discord.js");
const cores = require("../../json/cores.json");

module.exports.run = async (bot, message, args) => {
  let gif = gifs
  let pegar = gif[Math.floor(Math.random() * gif.length)];

  let embed = new Discord.MessageEmbed()
  .setColor(cores.dourado)
  .setImage(pegar)
  .setTitle(`${message.author.username} bebeu um café.`);

  message.channel.send(embed);
}

module.exports.help = {
  name: "café",
  aliases: ["cf"],
  description: "Beberás café. Útil no RP",
  category: "geral"
}
