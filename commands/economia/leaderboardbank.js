const Discord = require("discord.js");
const mongoose = require("mongoose");
const botconfig = require("../../botconfig.json");

mongoose.connect(botconfig.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

const Data = require("../../modelos/data.js");

module.exports.run = async (bot, message, args) => {
  Data.find({
    lb: "all"
  }).sort([
    ['banco', 'descending']
  ]).exec((err, res) => {
    if(err) console.log(err);

    var pagina = Math.ceil(res.length / 10);

    let embed = new Discord.MessageEmbed()
    embed.setTitle(`Classificação de ${message.guild.name}`, message.author.displayAvatarURL());
    embed.setColor("#FFD700");

    let pg = parseInt(args[0]);
    if(pg != Math.floor(pg)) pg = 1;
    if(!pg) pg = 1;
    let fim = pg * 10;
    let inicio = (pg * 10) - 10;

    if(res.length === 0) {
      embed.addField("Erro", "Nenhuma página encontrada");
    } else if(res.length <= inicio) {
      embed.addField("Erro", "Página não encontrada");
    } else if(res.length <= fim) {
      embed.setFooter(`Página ${pg}/${pagina} •  O Monarquista ©`);
      for(i = inicio; i < res.length; i++) {
        embed.addField(`${i + 1}. ${res[i].nome}`, `R$${res[i].banco.toLocaleString()}`);
      }
    } else {
      embed.setFooter(`Página ${pg}/${pagina} •  O Monarquista ©`);
      for(i = inicio; i < fim; i++) {
        embed.addField(`${i + 1}. ${res[i].nome}`, `R$${res[i].banco.toLocaleString()}`);
      }
    }
    message.channel.send(embed);

  })
}

module.exports.help = {
  name: "lbbanco",
  aliases: ["lbb", "topb", "rankb"],
  description: "",
  category: "economia",
  use: "[Página]"
}
