const { getLocale } = require("../../getLocale.js");
const mongoose = require("mongoose");
const Discord = require("discord.js");
const fs = require("fs");
const { mongoPass, prefix } = require("../../botconfig.json");

// CONECTAR A DATABASE
mongoose.connect(mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

//MODELOS
const Data = require("../../modelos/dataL.js");

module.exports.run = async (bot, message, args) => {
	Data.findOne({
	    userID: message.author.id
	  }, (err, data) => {
	    if(err) console.log(err);
	    if(!data) {
	        const newData = new Data({
	            userID: message.author.id,
	            lang: "pt",
	        })
	        newData.save().catch(err => console.log(err));      
	    }
	    const lang = data.lang;

	    const embed = new Discord.MessageEmbed()
	        .setColor("#FFD700")
	        .setAuthor(getLocale(lang, "HELP_AUTHOR", message.guild.me.displayName), message.guild.iconURL)
	        .setThumbnail(bot.user.displayAvatarURL);
	      if(!args[0]) {
	        const categories = fs.readdirSync("./commands/")
	    
	        embed.setDescription(getLocale(lang, "HELP_DESC", message.guild.me.displayName, prefix));
	        embed.setFooter(`© ${message.guild.me.displayName} | ${getLocale(lang, "COMMANDS")}: ${bot.commands.size}`, bot.user.displayAvatarURL);
	    
	        categories.forEach(category => {
	          const dir = bot.commands.filter(c => c.help.category === category)
	          const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
	          try {
	            embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.help.name}\``).join(" "))
	          } catch(e) {
	              console.log(e)
	            }
	        })
	    
	        return message.channel.send(embed)
	      } else if(args[0] && bot.commands.has(args[0])) {
	        const cmd = bot.commands.get(args[0]);
	        const capitalise = cmd.help.name.slice(0, 1).toUpperCase() + cmd.help.name.slice(1)
	        const capitaliseCat = cmd.help.category.slice(0, 1).toUpperCase() + cmd.help.category.slice(1)
	    
	        const embed2 = new Discord.MessageEmbed()
	          .setAuthor(`${capitalise} | Ajuda`, bot.user.displayAvatarURL())
	          .setColor("00ff00")
	          .addField(getLocale(lang, "HELP_NAME"), `\`\`${capitalise}\`\``)
	          .addField("**Aliases**", `\`\`${cmd.help.aliases}\`\``)
	          .addField(getLocale(lang, "HELP_DESC2"), `\`\`${cmd.help.description}\`\``)
	          .addField(getLocale(lang, "HELP_USE"), `\`\`${prefix}${cmd.help.name} ${cmd.help.use}\`\`` || "Sem utilização")
	          .addField(getLocale(lang, "HELP_CAT"), `\`\`${capitaliseCat}\`\``);
	    
	        return message.channel.send(embed2);
	        }
	})
}

module.exports.help = {
  name: "help",
  aliases: ["h", "ajuda", "ajd"],
  description: "O comando que disponibiliza este painel",
  category: "geral",
  use: "[Comando]"
}
