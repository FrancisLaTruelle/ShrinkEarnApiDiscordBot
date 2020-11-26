const Discord = require('discord.js');
const { MessageAttachment } = require('discord.js');
const client = new Discord.Client();
var request = require('request');

const apikey = "YOUR SHRINKEARN API KEY" 

client.on('message', message => {
    if (message.content.startsWith('!shortenlink')) {
        const args = message.content.split(' ')

        if (!args[1]) return message.channel.send(`You forgot the link !`)

        const url = "https://shrinkearn.com/api?api=" + apikey + "&url=" + args[1]
	    request(url, function(err, response, body) {
            if (err) {
                console.log(err);
                return message.channel.send(`Request error (look at the console)`);
            }
            
            body = JSON.parse(body);

            if (body) {
                const statusrequest = body.status;
                const shortenedUrl = body.shortenedUrl;

                if (!statusrequest || !shortenedUrl) return message.channel.send(`The api is down`);

                if (statusrequest === "error") {
                    message.channel.send(`Error :` + body.message[0])
                }

                message.channel.send(`Done ! Your link : ` + body.shortenedUrl);
            }
        })
    }
})

client.login('YOUR TOKEN HERE');