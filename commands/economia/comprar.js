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
    if(!args[0]) return message.channel.send("Por favor, específique um ID, este é mostrado na loja.")
    if(!args[1]) { 
        var qtd = 1
    } else {
        var qtd = Number(args[1]);
    }
    Data.findOne({
        id: args[0]
    }, (err, data) => {
        if(err) console.log(err);
        if(!data) return message.channel.send("Este item não existe.")

        DataD.findOne({
            userID: message.author.id
        }, (err, user) => {
            if(err) console.log(err);
            if(!user) { 
            return message.channel.send("Não tens dinheiro.")
            } else  {

                Inv.findOne({
                    userID: message.author.id,
                    itemID: args[0]
                }, (err, inv) => {
                    if(err) console.log(err);
                    let qtdv = data.preço * qtd
                    if(!inv) {
                        if(user.dinheiro >= qtdv) {
                            user.dinheiro -= qtdv
                            user.save().catch(err => console.log(err));
                            message.channel.send(`Compraste ${data.nome} por R$${qtdv}.`)
                        } else {
                            return message.channel.send("Não tens dinheiro");
                        }
                        const newInv = new Inv({
                            userID: message.author.id,
                            itemID: args[0],
                            nome: data.nome,
                            desc: data.desc,
                            tipo: data.tipo,
                            qtd: qtd
                        })
                        newInv.save().catch(err => console.log(err));
                    } else {
                        let filtro = { userID: message.author.id, itemID: args[0] }
                        if(user.dinheiro >= qtdv) {
                            user.dinheiro -= qtdv
                            user.save().catch(err => console.log(err));
                        }  else {
                            return message.channel.send("Não tens dinheiro");
                        }
                        inv.qtd += qtd
                        inv.save().catch(err => console.log(err));
                        return message.channel.send(`Compraste mais ${qtd} ${data.nome} por R$${qtdv}.`);
                    }
                })
            }
        })
    })
}


module.exports.help = {
  name: "comprar",
  aliases: ["buy", "cp"],
  description: "Um comando para que se possa comprar ações.",
  category: "economia",
  use: ""
}