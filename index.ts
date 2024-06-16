// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from 'discord.js';
const cron = require('node-cron');
// Load environment variables from .env file
import 'dotenv/config'

const token = process.env.DISCORD_TOKEN

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const generalChannelId = process.env.GENRAL_CHANNEL_ID
const cronExpression = '* * * *' // 0 15 * * 1,2 , * * * *

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
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


// Log in to Discord with your client's token
client.login(token);