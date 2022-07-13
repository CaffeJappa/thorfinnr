const math = require("mathjs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!args[0]) return message.channel.send("Por favor providêncie um cálculo")

  let resp;

  try {
    resp = math.evaluate(args.join(" "))
  } catch (e) {
    return message.channel.send("Por favor providêncie um cálculo **válido**")
  }

  const embed = new Discord.MessageEmbed()
  .setColor("#FFD700")
  .setTitle("Calculadora")
  .addField("Cálculo", `\`\`\`css\n${args.join(" ")}\`\`\``)
  .addField("Resposta", `\`\`\`css\n${resp}\`\`\``);

  message.channel.send(embed);
}

module.exports.help = {
  name: "math",
  aliases: ["calc", "m"],
  description: "Calcula um número",
  category: "geral",
  use: "<Número> <Expressão (+/-*^)> <Número>"
}
