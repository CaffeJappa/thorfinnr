const Discord = require("discord.js");
const gifs = require("../../json/álcools.json");
const cores = require("../../json/cores.json");

module.exports.run = async (bot, message, args) => {
  let gif = gifs;
  let pegar = gif[Math.floor(Math.random() * gif.length)];

  let embed = new Discord.MessageEmbed()
  .setColor(cores.dourado)
  .setImage(pegar)
  .setTitle(`${message.author.username} tomou uma.`);

  message.channel.send(embed);
}

module.exports.help = {
  name: "álcool",
  aliases: ["alcool", "alc", "vodka", "cerveja", "skol", "kaiser", "cachaça", "licor", "saquê", "gim"],
  description: "Vai tomar umazinha",
  category: "geral"
}
