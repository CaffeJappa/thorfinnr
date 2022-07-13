module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("Não tens permissão para o fazer.")
    } else {
        let user = message.mentions.members.first();
        if(!user) return message.channel.send("Marca alguém né pai.")
        let razão = args.slice(4).join(` `);
        let autor = message.author;
        let cida = message.guild.roles.cache.find(r => r.name === "Cidadão");
        let br = message.guild.roles.cache.find(r => r.name === "Brasileiro(a)");
        let refu = message.guild.roles.cache.find(r => r.name === "Refugiado");

        if(!args[1]) {
          message.channel.send("Siga o padrão! -aprovar [Usuário] [Brasileiro:Sim/Não]");
          return
        }

        if(args[1] == "Brasileiro:Sim") {
          message.channel.send(`Olá! ${user}, você foi aprovado na whitelist do servidor! Leia as regras para evitar punições e um bom RP!\n**Moderador:** ${autor}`);
          user.roles.add(cida.id);
          user.roles.add(br.id);
          user.roles.remove(refu.id);
        } else if(args[1] == "Brasileiro:Não") {
          message.channel.send(`Olá! ${user}, você foi aprovado na whitelist do servidor! Leia as regras para evitar punições e um bom RP!\n**Moderador:** ${autor}`);
          user.roles.add(cida.id);
          user.roles.remove(refu.id);
        }
    }
}

module.exports.help = {
    name: "aprovar",
    aliases: ["app"],
    description: "Aprovará um usuário.",
    use: "[Usuário]",
    category: "geral"
}
