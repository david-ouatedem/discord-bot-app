import { Client, Events, GatewayIntentBits } from 'discord.js';
import express from 'express'
import cron from 'node-cron';
import 'dotenv/config'

const app = express()
const token = process.env.DISCORD_TOKEN
const port = process.env.PORT

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const generalChannelId = process.env.GENRAL_CHANNEL_ID
const cronExpression = '0 15 * * 1,2' // 0 15 * * 1,2 , * * * * *

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    cron.schedule(cronExpression, () => {
        const channel = client.channels.cache.get(generalChannelId??'');
        if (channel && channel.isTextBased() ) {
            channel.send('This is your scheduled message.');
        } else {
            console.error('Channel not found');
        }
    });

});


client.login(token);


app.get('/', (req, res) => {
    res.send('Discord bot is running!');
});

app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});