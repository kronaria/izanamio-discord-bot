const Discord = require("discord.js");

const ytdl = require("ytdl-core");

const { token, prefix } = require('./config.json')

const {Client} = require("discord.js");
const { start } = require("repl");

const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.on("ready", () => { 
    console.log(`${client.user.username} est connecté`);
});


client.on('guildMemberRemove', member =>{

});

client.on('guildMemberAdd', (member) => {
    const emoji = client.emojis.cache.find((emoji) => emoji.id === "801961425144512562")
    const logchannel = member.guild.channels.cache.find((cha) => cha.id === '803986902092611645')
    if( !logchannel) return console.log('non trouvé')
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${member.user.username}`, `${member.user.displayAvatarURL()}`)
    .setColor('RANDOM')
    .setDescription(`:fire: Bienvenue sur le serveur ${member} :fire: \n tu es la ${member.guild.memberCount} personnes du serveur \n nous te souhaitons une bonne journée`)
    .setFooter(`${client.user.username}`, `${client.user.displayAvatarURL()}`)
    .setTimestamp() 
    logchannel.send(embed)
    member.roles.add("803987653279875072");
});


client.on("message", message => {
    if(message.author.bot) return;

    if (message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let  mention = message.mentions.members.first();

            if (mention == undefined){
                message.reply("membre mal ou non mentionné")
            }
            else {
                if(mention.bannable){
                    mention.ban();               
                    message.channel.send(mention.displayName + " a été banni ")
                    
                }
                else {
                    message.reply("impossible de bannir ce membre.");
                }
            }
        }
        else if  (message.content.startsWith(prefix + "kick")){
            let  mention = message.mentions.members.first();
            
            if (mention == undefined){
                message.reply("Membre mal mentionné ou non mentionné");
               }   
            else{
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " a été kick");
                }
                else {
                    message.reply("impossible de kick ce membre.");
                }
            }
        }
        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre mal mentionné ou non mentionné");
            }
            else {
                mention.roles.add("803988879580332102");
                message.reply(mention.displayName + " membre mute avec succès.")
                 
            }
        }
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre mal mentionné ou non mentionné");
            }
            else {
                mention.roles.remove("803988879580332102");
                message.reply(mention.displayName + " n'a plus le role muted");
            }
        }
        else if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if (mention == undefined){
                message.reply("Membre mal ou non mentionné")
            }
            else {
                let args = message.content.split(" ");

                mention.roles.add("803988879580332102");
                setTimeout(function(){
                    mention.roles.remove("803988879580332102");
                    message.channel.send("<@" + mention.id + "> tu peux désormais parler");
                }, args[2] * 1000);
            }
        }
    }

    

    if(message.content == prefix + "ping")
        message.channel.send("pong");

    if(message.content == prefix + "kronaria")
        message.channel.send("le plus beau joueur du monde");

    if(message.content == prefix + "offline")
        message.channel.send("le 2eme plus beau joueur du monde après kronaria");
        
});

client.login(process.env.TOKEN);