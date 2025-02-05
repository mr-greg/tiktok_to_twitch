import { WebcastPushConnection } from 'tiktok-live-connector';
import { RefreshingAuthProvider } from '@twurple/auth';
import { Bot } from '@twurple/easy-bot';
import config from './config.json' with { type: "json" };
import { promises as fs } from 'fs';
const { clientId, tiktok_channel_name, refresh_token, clientSecret, twitch_channel_name } = config;



// Twitch

// Parsing du fichier json gérant le token d'accès
const tokenData = JSON.parse(await fs.readFile('./tokens.125328655.json', 'utf-8'));

// Connexion aux servers de twitch 
const authProvider = new RefreshingAuthProvider(
    {
        clientId,
        clientSecret
    }
);

// listener pour l'expiration du token d'accès => écriture des nouveaux tokens automatiques
authProvider.onRefresh(async (userId, newTokenData) => await fs.writeFile(`./tokens.${userId}.json`, JSON.stringify(newTokenData, null, 4), 'utf-8'));

// enregistrement des nouveaux tokens serveurs twitch
await authProvider.addUserForToken(tokenData, ['chat']);

// création de l'instance du bot + connexion à la chaîne définie dans config.json "twitch_channel_name"
const bot = new Bot({ authProvider, channels: [twitch_channel_name] });

// A partir d'ici, notre instance de bot est créée, reste plus qu'à gérer l'écoute du chat tiktok, récupérer les commentaires et les répéter avec notre bot sur twitch

//  ----------------------------

// Récup nom chaîne en live
let tiktokLiveConnection;
let isConnected = false;

async function connectToTikTok() {
    console.log("Tentative de connexion au live TikTok...");

    tiktokLiveConnection = new WebcastPushConnection(tiktok_channel_name);

    tiktokLiveConnection.connect().then(state => {
        isConnected = true;
        console.info(`Connecté au live TikTok (roomId: ${state.roomId})`);
    }).catch(err => {
        console.error("Échec de connexion, nouvelle tentative dans 30 secondes...", err);
        isConnected = false;
        setTimeout(connectToTikTok, 30000); // Retente après 30s
    });

    // Gestion des messages TikTok
    tiktokLiveConnection.on('chat', async data => {
        const msg = `${data.uniqueId} a dit: ${data.comment}`;
        console.log(msg);

        try {
            await bot.say(twitch_channel_name, msg);
        } catch (err) {
            console.error("Erreur lors de l'envoi du message sur Twitch:", err);
        }
    });

    // Détection de la déconnexion
    tiktokLiveConnection.on('disconnected', () => {
        console.warn("Déconnecté du live TikTok. Reconnexion...");
        isConnected = false;
        setTimeout(connectToTikTok, 30000); // Reconnexion après 30s
    });
}

// Démarrer la connexion initiale
connectToTikTok();


/* GIFTS exemple
tiktokLiveConnection.on('gift', data => {
    console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
})
*/


