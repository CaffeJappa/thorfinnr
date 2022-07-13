const Discord = require("discord.js");
const ms = require("parse-ms");
const mongoose = require("mongoose");
const botconfig = require("../../botconfig.json");


// CONECTAR A DATABASE
mongoose.connect(botconfig.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

//MODELOS
const Data = require("../../modelos/ações.js");
const DataD = require("../../modelos/data.js");
const Inv = require("../../modelos/inventario.js");

module.exports.run = async (bot, message, args) => {
    if(!args[1]) {
        var qtd = 1
    } else {
        var qtd = Number(args[1])
    }
    if(!args[0]) return message.channel.send("Por favor, específique um ID, este é mostrado na loja.")
    Data.findOne({
        id: args[0]
    }, (err, data) => {
        if(err) console.log(err);
        if(!data) return message.channel.send("Este item não existe.")

        DataD.findOne({
            userID: message.author.id
        }, (err, user) => {
            if(err) console.log(err);
                Inv.findOne({
                    userID: message.author.id,
                    itemID: args[0]
                }, (err, inv) => {
                    if(err) console.log(err);
                    if(qtd >= inv.qtd) return message.channel.send("Tu não podes vender a mais do que tens.")
                    if(!inv) {
                        return message.channel.send("O item não existe ou já foi vendido.")
                    } else {
                        let pretzo = data.preço * qtd;
                        user.dinheiro += pretzo;
                        user.save().catch(err => console.log(err));
                        if(inv.qtd === 1 && qtd === inv.qtd) {
                            Inv.findOneAndDelete({
                                userID: message.author.id,
                                itemID: args[0]
                            }, function (err) {
                                if(err) console.log(err);
                            });
                        } else {
                            inv.qtd -= qtd
                            inv.save().catch(err => console.log(err));
                        }
                        return message.channel.send(`Vendeste ${qtd} ${data.nome} por R$${pretzo.toLocaleString()}.`);
                    }
                })
        })
    })
}


module.exports.help = {
  name: "vender",
  aliases: ["sell", "ve"],
  description: "Um comando para que se possa vender ações.",
  category: "economia",
  use: ""
}