module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Não tens permissão, pequeno gafanhoto.");
  let canal = message.mentions.channels.first()
  if(canal) {
    const canal = args.shift().slice(2,-1); // this is due to how channel mentions work in discord (they are sent to clients as <#462650628376625169>, this cuts off the first <# and the finishing >)
    const sayMessage = args.join(` `);

    bot.channels.cache.get(canal).send(`${sayMessage}`);
    message.delete().catch(O_o=>{});
  } else {
    let sayMsg = args.join(" ");
    message.channel.send(`${sayMsg}`);
    message.delete().catch(O_o=>{});
  }
}

module.exports.help = {
  name: "say",
  aliases: ["falar", "fl"],
  description: "Dirá o que digitares.",
  category: "moderação",
  use: "[Canal] [Conteúdo]"
}
