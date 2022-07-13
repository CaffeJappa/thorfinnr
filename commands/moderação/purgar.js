module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Não tens permissão, pequeno gafanhoto.");
  let numero = args[0];
  if(isNaN(parseInt(numero))) return message.channel.send("Insira um número **válido** de mensagens a purgar.");
  if(numero > 100) return message.channel.send("Por favor insira um número de 1-1000");
  if(numero < 1) return message.channel.send("Por favor insira um número de 1-1000");

  if(!numero) {
    return message.channel.send("Insira um número de mensagens a deletar!");
  }
    message.channel.bulkDelete(numero)
      .then( messages => message.channel.send(`Foram deletadas **${messages.size}/${numero}** mensagens!`))
      .catch( error => console.log(error));
}

module.exports.help = {
  name: "purgar",
  aliases: ["pu", "prune", "cl", "clear"],
  description: "Deletará mensagens no canal atual.",
  category: "moderação",
  use: "[Número 1-100]"
}
