const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const gatos = require("../../json/gatos.json")

module.exports.run = async (bot, message, args) => {

    let choices = gatos
    let response = choices[Math.floor(Math.random() * choices.length)]

    message.channel.send("Aqui jaz um gato", { files: [ response ] });

  }

module.exports.help = {
  name: "gato",
  aliases: ["cat"],
  description: "Enviará um gato qualquer.",
  category: "geral",
  use: ""
}
