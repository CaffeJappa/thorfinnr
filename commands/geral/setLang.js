const Discord = require("discord.js");
const ms = require("parse-ms");
const mongoose = require("mongoose");
const botconfig = require("../../botconfig.json");
const { getLocale } = require("../../getLocale.js");

// CONECTAR A DATABASE
mongoose.connect(botconfig.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

//MODELOS
const Data = require("../../modelos/dataL.js");

module.exports.run = async (bot, message, args) => {
	const langs = ['pt', 'hrx', 'vec']
	if(!args[0]) {
		return message.channel.send("Defina uma das seguintes línguas: **pt**, **hrx** ou **vec**");
	}
	let noval = args[0].toLowerCase();
	if(!langs.includes(noval)) {
		return message.channel.send("Defina uma das seguintes línguas: **pt**, **hrx** ou **vec**");
	}

	function transLang(arg) {
		if(arg == 'pt') {
			return "português";
		} else if (arg == 'hrx') {
			return "Hunsrickisch";
		} else if (arg == 'vec') {
			return "vèneto";
		}
	}
	
	Data.findOne({
	      userID: message.author.id
	    }, (err, userData) => {
	      if(err) console.log(err);
	
	      if(!userData) {
	        let valor = parseInt(args[1]) + 20000;
	        const newData = new Data({
	          userID: message.author.id,
	          lang: noval
	        })
	        newData.save().catch(err => console.log(err));
	      } else {
	        userData.lang = noval;
	        userData.save().catch(err => console.log(err));
	      }
	      //return message.channel.send(`${message.author} definiu sua língua para ${noval}.`);
	      return message.channel.send(getLocale(noval, "LANGUAGE_SET", message.author, transLang(noval)));
	    })
}

module.exports.help = {
  name: "setlang",
  aliases: ["lang", "łéngua", "łeng", "língua", "sproch"],
  description: "Vai definir a tua língua.",
  category: "economia",
  use: "[Usuário] [Dinheiro]"
}
