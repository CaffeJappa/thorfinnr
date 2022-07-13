const { getLocale } = require("../../getLocale.js");
const mongoose = require("mongoose");
const botconfig = require("../../botconfig.json");


// CONECTAR A DATABASE
mongoose.connect(botconfig.mongoPass, {
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

	    message.channel.send(getLocale(lang, "MALAGGI"));
	    

	  })
}

module.exports.help = {
  name: "malaggi",
  aliases: ["rewind", "kelvin"],
  description: "Quem é Kelvin!?",
  category: "geral"
}
