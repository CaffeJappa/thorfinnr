const Discord = require("discord.js");
const ms = require("parse-ms");
const mongoose = require("mongoose");
const botconfig = require("../../botconfig.json");
const math = require("mathjs");


// CONECTAR A DATABASE
mongoose.connect(botconfig.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

//MODELOS
const Data = require("../../modelos/data.js");

module.exports.run = async (bot, message, args) => {
    let timeout = 172800000;

    Data.findOne({
        userID: message.author.id
    }, (err, data) => {
        if(err) console.log(err);
        if(!data) {
            const newData = new Data({
                nome: message.author.username,
                userID: message.author.id,
                lb: "all",
                dinheiro: 20000,
                banco: 0,
                data: 0,
                ipData: 0,
                robData: 0,
                salData: 0,
              })
              newData.save().catch(err => console.log(err));
              return message.channel.send("Por favor, reexecute o comando.")
        }
        if(timeout - (Date.now() - data.salData) > 0) {
            let time = ms(timeout - (Date.now() - data.salData))
            return message.channel.send(`Já coletaste o teu salário. Volte aqui em: **${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s**`);
        } else {
            let embed = new Discord.MessageEmbed();
            embed.setTitle(`Salário(s) de ${message.author.username}`);
            if(message.member.roles.cache.find(r => r.name === "Presidente da República")) {
                data.dinheiro += 36000
                embed.addField(`R$36.000`, `Salário de Presidente da República`)
            }
            if(message.member.roles.cache.find(r => r.name === "Vice-Presidente da República")) {
                data.dinheiro += 36000
                embed.addField(`R$36.000`, `Salário de Vice-Presidente da República`)
            }
            if(message.member.roles.cache.find(r => r.name === "Deputado Federal")) {
                data.dinheiro += 32000
                embed.addField(`R$32.000`, `Salário de Deputado Federal`)
            }
            if(message.member.roles.cache.find(r => r.name === "Senador Federal")) {
                data.dinheiro += 35000
                embed.addField(`R$35.000`, `Salário de Senador Federal`)
            }
            if(message.member.roles.cache.find(r => r.name === "Ministro de Estado")) {
                data.dinheiro += 28000
                embed.addField(`R$28.000`, `Salário de Ministro Executivo`)
            }
            if(message.member.roles.cache.find(r => r.name === "Ministro do STF")) {
                data.dinheiro += 40000
                embed.addField(`R$40.000`, `Salário de Ministro do STF`)
            }
            if(message.member.roles.cache.find(r => r.name === "Governador Estadual")) {
                data.dinheiro += 20000
                embed.addField(`R$20.000`, `Salário de Governador`)
            }
            if(message.member.roles.cache.find(r => r.name === "Vice-Governador Estadual")) {
                data.dinheiro += 20000
                embed.addField(`R$20.000`, `Salário de Vice-Governador`)
            }
            if(message.member.roles.cache.find(r => r.name === "Procurador-Geral da República")) {
                data.dinheiro += 25000
                embed.addField(`R$25.000`, `Salário de Procurador-Geral da República`)
            }
            if(message.member.roles.cache.find(r => r.name === "Militar das Forças Armadas")) {
                data.dinheiro += 10000
                embed.addField(`R$10.000`, `Salário de Militar`)
            }
            if(message.member.roles.cache.find(r => r.name === "Diretor da Polícia Federal")) {
                data.dinheiro += 20000
                embed.addField(`R$20.000`, `Salário de Diretor da PF`)
            }
            if(message.member.roles.cache.find(r => r.name === "Agente da Polícia Federal")) {
                data.dinheiro += 20000
                embed.addField(`R$15.000`, `Salário de Agente Criminal da PF`)
            }
            if(message.member.roles.cache.find(r => r.name === "Ministro do STJ")) {
                data.dinheiro += 35000
                embed.addField(`R$35.000`, `Salário de Ministro do STJ`)
            }
            if(message.member.roles.cache.find(r => r.name === "Ministro do TSE")) {
                data.dinheiro += 35000
                embed.addField(`R$35.000`, `Salário de Ministro do TSE`)
            } else {
                data.dinheiro += 100
                embed.addField(`R$100`, `Salário de Trabalhador`)
            }

            data.salData = Date.now()
            data.save().catch(err => console.log(err));
            embed.setColor("#FFD700")
            embed.setDescription("Salário Recebido Totalmente.")
            return message.channel.send(embed);
        }
    })
}

module.exports.help = {
    name: "salario",
    aliases: ["sl"],
    description: "Te dará o teu salário, vagabundo.",
    category: "economia",
    use: ""
}
