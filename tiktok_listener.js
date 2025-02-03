import { WebcastPushConnection } from 'tiktok-live-connector';
import { StaticAuthProvider } from '@twurple/auth';
import { Bot, createBotCommand } from '@twurple/easy-bot';
import config from './config.json' with { type: "json" };
const { clientId, access_token, tiktok_channel_name } = config;

// Username of someone who is currently live
let tiktokUsername = tiktok_channel_name;

// Twitch
const authProvider = new StaticAuthProvider(clientId, access_token);
const bot = new Bot({ authProvider, channels: ['goatyfull'] });

// Create a new wrapper object and pass the username
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

// Connect to the chat (await can be used as well)
tiktokLiveConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
})

// Define the events that you want to handle
// In this case we listen to chat messages (comments)
tiktokLiveConnection.on('chat', data => {
    var msg = `${data.uniqueId} writes: ${data.comment}`;
    console.log(msg);

    bot.say("goatyful", msg)
})

/* GIFTS
tiktokLiveConnection.on('gift', data => {
    console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
})
*/


