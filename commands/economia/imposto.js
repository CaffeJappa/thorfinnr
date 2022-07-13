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
    let timeout = 259200000

    Data.findOne({
        userID: message.author.id
    }, (err, res) => {
        if(err) console.log(err)
        if(!res) {
            const newData = new Data({
                nome: message.author.username,
                userID: message.author.id,
                lb: "all",
                dinheiro: 0,
                banco: 0,
                data: 0,
                ipData: Date.now(),
                robData: 0,
                salData: 0,
              })
              newData.save().catch(err => console.log(err));
              return message.channel.send("Impostos cobrados.")
        } else {
            if(timeout - (Date.now() - res.ipData) > 0) {
            let time = ms(timeout - (Date.now() - res.ipData))

            return message.channel.send(`Ainda não é tempo de pagar impostos. Volte aqui em ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`)
            } else {
                let valor = "6000"
                res.dinheiro -= valor
                res.ipData = Date.now()
                res.save().catch(err => console.log(err));

                return message.channel.send("Impostos cobrados.");
            }
        }
    })
}

module.exports.help = {
    name: "imposto",
    aliases: ["ip"],
    description: "Cobrará os impostos.",
    category: "economia",
    use: ""
}