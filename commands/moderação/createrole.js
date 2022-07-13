const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Não tens permissão, pequeno gafanhoto.");
  let roleName = args.slice(3).join(" ");
  let color = args[0];
  let position = args[1];

  if(args[2] === "sim") {
    var hoist = "true"
  } else if(args[2] === "não") {
    var hoist = "false"
  }
  if(!args[2]) {
    var hoist = "false"
  }
  if(!roleName) return message.channel.send("Especifique o nome do cargo!");
  if(!position) {
    let position = "1"
  }

  message.guild.roles.create({
    data: {
      name: roleName,
      hoist: hoist,
      color: color,
      mentionable: false,
    },
  }).then(role => role.setPosition(position))
  .catch(e => console.log(e));

  message.channel.send(`Cargo Criado com Sucesso!\n\n**Nome:** ${roleName}\n**Cor:** ${color}\n**Posição:** ${position}\n**Separado:** ${hoist}`);
}

module.exports.help = {
  name: "createrole",
  aliases: ["cr"],
  description: "Cria um cargo.",
  category: "moderação",
  use: "[Cor] [Posição] [Separável (sim/não)] [Nome]",
}
