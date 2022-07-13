module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Não tens permissão, pequeno gafanhoto.");
  let canal = message.mentions.channels.first()

  if(!canal) {
    return message.channel.send("Por favor, digite um canal para que eu possa anunciar.")
  } else {
    const canal = args.shift().slice(2,-1);
    let reg = /!(.*) \[(.*)\] (.*)/g;
    let result = reg.exec(message.content);
    if(result === null) return console.log("Formato incorrecto");
    let announceName = result[2];
    let announceContent = result[3];
    //const mensagem = args[1].join(" ");
    //const anuncionome = args.slice()

    bot.channels.cache.get(canal).send(`:scroll: **| ${announceName}**\n\n${announceContent}\n\n||@everyone|| - ${message.author}/${message.author.username}`);
  }
}

module.exports.help = {
  name: "anunciar",
  aliases: ["an"],
  description: "Anunciará algo em um canal, cuidado pois menciona everyone.",
  category: "moderação",
  use: "{[Nome do Anúncio]} [Conteúdo do Anúncio]"
}
