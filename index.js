const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const botconfig = require("./botconfig.json");
const fs = require("fs");

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.description = new Discord.Collection();

//LER PASTA DE COMANDOS
const load = dirs => {
  const commands = fs.readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
  for (let file of commands) {
    let props = require(`./commands/${dirs}/${file}`);
    console.log(`${file} carregado!`);
    bot.commands.set(props.help.name, props);
    bot.description.set(props.help.description, props);
    if(props.help.aliases) props.help.aliases.forEach(a => bot.aliases.set(a, props.help.name));
  };
};
["geral", "moderação", "economia"].forEach(x => load(x));
/*
fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0) {
    console.log("Não achei nenhum comando.");
    return;
  }

  jsfile.forEach((f) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} carregado`);
    bot.commands.set(props.help.name, props);
    bot.description.set(props.help.description, props);

    props.help.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    })
  })
})
*/

//MENSAGEM ONLINE E PA
bot.on("ready", async () => {
  console.log(`${bot.user.username} está online em ${bot.guilds.cache.size} servidores!`);
  //SETAR ATIVIDADES (WATCHING, LISTENING, PLAYING E STREAMING)
  let atividades = [
    `Utilize ${botconfig.prefix}help para uma lista de comandos`,
    `${bot.channels.cache.size} canais`,
    `${bot.guilds.cache.size} servidores`
  ],
  i = 0;
  setInterval(() => bot.user.setActivity(`${atividades[i++ % atividades.length]}`, {
    type: "WATCHING"
  }), 5000);

})

//Log de Delets

bot.on("messageDelete", async message => {
  let loggingembed = new Discord.MessageEmbed()
  .setTitle(":pencil: Mensagem Deletada")
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setColor("#ff0000")
  .addField("Deletada em:", message.channel)
  .addField("Deletada:", message.createdAt)
  .addField("Conteúdo:", `\`\`\`\n${message.content}\`\`\``)
  .addField("Anexos:", `${message.attachments.url}`)
  .setTimestamp()
  .setFooter("Le Républicain ©", message.guild.iconURL());

  let logcanal = message.guild.channels.cache.find(c => c.name === "logs");
  if(!logcanal) return;

  logcanal.send(loggingembed);
});

//Log de Edits
bot.on("messageUpdate", async(oldMessage, newMessage) => {
  if(oldMessage.content === newMessage.content) return;
  if(!newMessage.member.hasPermission("MANAGE_CHANNELS")) {
  if(newMessage.content.includes('discord.gg/'||'discordapp.com/invite/')) { //if it contains an invite link
    newMessage.delete() //delete the message
    .then(newMessage.channel.send("Não permitimos a divulgação de outros servidores por aqui."))
    return
  }
}
  let embed = new Discord.MessageEmbed()
  .setTitle(":pencil: Mensagem Editada")
  .setColor("#ffff00")
  .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
  .addField("Editada em:", oldMessage.channel)
  .addField("Editada:", oldMessage.createdAt)
  .addField("Mensagem Antiga:", `\`\`\`\n${oldMessage.content}\`\`\``)
  .addField("Mensagem Nova:", `\`\`\`\n${newMessage.content}\`\`\``)
  .setTimestamp()
  .setFooter("Le Républicain ©", oldMessage.guild.iconURL());

  let logcanal = oldMessage.guild.channels.cache.find(c => c.name === "logs");
  if(!logcanal) return;

  logcanal.send(embed);
});

//Log de Entradas
//bot.on("guildMemberAdd", member => {
//    let embed = new Discord.MessageEmbed()
//    embed.setAuthor(member.author.tag, member.displayAvatarURL());
//    embed.setColor("#FFD700");
//    embed.setDescription(`Olá, ${member}, a **Torre de Controle** pede para que tu passes desta ala para a ala <#742073104687300778>, para que possas jogar o RP devidamente!`);
//    embed.setTimestamp();
//    embed.setFooter("O Monarquista ©", member.guild.iconURL());
//    member.guild.channels.cache.get('742068696066818078').send(embed);
//});

//Log de Saídas
//bot.on("guildMemberRemove", member => {
//    member.guild.channels.cache.get('742068696066818078').send(`**O membro ${member} (${member.tag}) acaba de sair do Império! Que Deus o abençoe em suas próximas jornadas.**`);
//});

bot.on("message", async message =>{
  // VERIFICAR TIPO DE CANAL
  if(message.channel.type === "dm") return;
  if(message.author.bot) return;
  if(message.content.includes('discord.gg/'||'discordapp.com/invite/')) { //if it contains an invite link
    message.delete() //delete the message
    .then(message.channel.send("Não permitimos a divulgação de outros servidores por aqui."))
  }

  //DEFINIR PREFIXO
  let prefix = botconfig.prefix;

  //VERIFICAR PREFIXO, DEFINIR ARGS E COMANDOS
  if(!message.content.startsWith(prefix)) return;
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd;
  cmd = args.shift().toLowerCase();
  let command;
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);

  // EXECUTAR COMANDOS
  if(bot.commands.has(cmd)) {
    command = bot.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
    command = bot.commands.get(bot.aliases.get(cmd));
  }
  try {
    command.run(bot, message, args);
  } catch (e) {
    return;
  }
})

bot.login(TOKEN);
