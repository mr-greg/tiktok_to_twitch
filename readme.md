## English below

# Guide : Utilisation du bot de retranscription TikTok → Twitch

Ce guide explique comment configurer et utiliser le bot permettant de retranscrire automatiquement les messages du chat d'un live TikTok vers un chat Twitch en utilisant Twurple.

## 1. Pré-requis

- Un compte Twitch dédié au bot (exemple : `zaackyo_bot`), peut également être votre compte Twitch principal avec lequel vous streamez, il parlera juste en votre nom dans le chat.
- Node.js installé sur votre machine.
- Clé d’API Twitch (voir section suivante).

## 2. Création et configuration de l'application Twitch

Le bot doit se connecter au chat Twitch. Pour cela, vous devez créer une application Twitch afin d'obtenir les informations suivantes : `clientId`, `access_token`, et `refresh_token`.

### 2.1. Création de l'application Twitch

1. Rendez-vous sur le [Twitch Developer Console](https://dev.twitch.tv/console/apps).
2. Connectez-vous avec votre compte Twitch.
3. Cliquez sur **Register Your Application**.
4. Remplissez les champs :
   - **Name** : Nom de votre application
   - **OAuth Redirect URLs** : `http://localhost`
   - **Category** : `Chat Bot`
5. Cliquez sur **Create**.
6. Vous obtenez un **Client ID** (notez-le quelque part).
7. Cliquez sur **New Secret** pour générer un **Client Secret** (notez-le aussi, il ne sera plus visible plus tard).
8. Remplissez ces informations dans le fichier `example.config.json`, puis renommez-le en `config.json`.

### 2.2. Obtention du Token d'authentification

Pour obtenir un `access_token` et un `refresh_token`, suivez ces étapes :

1. Remplacez `CLIENT_ID` par votre Client ID dans l'URL ci-dessous et ouvrez-la dans un navigateur :

```
https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=CLIENT_ID&redirect_uri=http://localhost&scope=chat:read+chat:edit
```

2. Connectez-vous avec votre compte Twitch et autorisez l'application.
3. Vous serez redirigé vers `http://localhost/?code=VOTRE_CODE_ICI`. Notez le `code` fourni dans l'URL (il est normal d'avoir une page introuvable, le code est dans l'URL de votre navigateur).
4. Échangez ce code contre un token en exécutant la requête suivante (vous pouvez aussi utiliser `req_example.py` ou `req_example.js` présents dans le repo) :

```sh
curl -X POST "https://id.twitch.tv/oauth2/token" \
     -d "client_id=CLIENT_ID" \
     -d "client_secret=CLIENT_SECRET" \
     -d "code=VOTRE_CODE_ICI" \
     -d "grant_type=authorization_code" \
     -d "redirect_uri=http://localhost"
```

5. La réponse contiendra `access_token` et `refresh_token`. Remplissez ces informations dans `example.tokens.125328655.json`, puis renommez-le en `tokens.125328655.json`.

### 2.3. Rafraîchir automatiquement le Token

Les `access_token` expirent régulièrement. Le bot gère automatiquement leur rafraîchissement en mettant à jour `tokens.125328655.json`.

## 3. Configuration du bot

Le bot doit savoir quelle chaîne TikTok écouter et où envoyer les messages sur Twitch.

1. Dans `config.json`, renseignez :
   - **Nom de la chaîne TikTok** dont vous souhaitez récupérer le chat.
   - **Nom de la chaîne Twitch** où retranscrire les messages.

Exemple :

```json
{
  "tiktokChannel": "nom_du_tiktoker",
  "twitchChannel": "nom_du_twitcher",
  "clientId": "VOTRE_CLIENT_ID",
  "clientSecret": "VOTRE_CLIENT_SECRET"
}
```

## 4. Lancement du bot

Une fois la configuration terminée, vous pouvez démarrer le bot :

```sh
node bot.js
```

Si tout est bien configuré, vous verrez les messages du chat TikTok apparaître sur le chat Twitch !

Le bot est fait de façon à ce qu'il puisse tourner 24/7 sur un serveur, il attendra que la chaîne TikTok soit en live pour retranscrire le chat. Attention, il écrit dans le chat twitch même si la chaîne twitch n'est pas en live !

## 5. Résumé

1. Créez une application Twitch et récupérez `clientId`, `access_token` et `refresh_token`.
2. Configurez `config.json` avec les informations Twitch et TikTok.
3. Lancez le bot avec `node bot.js`.
4. Le bot retranscrit automatiquement les messages TikTok vers Twitch.

Pensez à stocker vos tokens de manière sécurisée et à vérifier régulièrement que le bot fonctionne correctement. 🚀

-------------------------------------------------------------------------

# Guide: Using the TikTok → Twitch Chat Relay Bot

This guide explains how to set up and use the bot that automatically relays messages from a TikTok live chat to a Twitch chat using Twurple.

## 1. Requirements

- A dedicated Twitch account for the bot (e.g., `zaackyo_bot`). You can also use your main Twitch account, but the bot will speak in your name in the chat.
- Node.js installed on your machine.
- Twitch API credentials (see the next section).

## 2. Creating and Configuring the Twitch Application

The bot needs to connect to the Twitch chat. To do this, you must create a Twitch application to obtain the following information: `clientId`, `access_token`, and `refresh_token`.

### 2.1. Creating the Twitch Application

1. Go to the [Twitch Developer Console](https://dev.twitch.tv/console/apps).
2. Log in with your Twitch account.
3. Click **Register Your Application**.
4. Fill in the fields:
   - **Name**: Your application name
   - **OAuth Redirect URLs**: `http://localhost`
   - **Category**: `Chat Bot`
5. Click **Create**.
6. You will receive a **Client ID** (save it somewhere safe).
7. Click **New Secret** to generate a **Client Secret** (save it, as it will not be visible again).
8. Enter these details in `example.config.json`, then rename the file to `config.json`.

### 2.2. Obtaining the Authentication Token

To get an `access_token` and `refresh_token`, follow these steps:

1. Replace `CLIENT_ID` with your Client ID in the following URL and open it in a browser:

```
https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=CLIENT_ID&redirect_uri=http://localhost&scope=chat:read+chat:edit
```

2. Log in with your Twitch account and authorize the application.
3. You will be redirected to `http://localhost/?code=YOUR_CODE_HERE`. Copy the `code` from the URL (you might see a "page not found" error, but the code is in the browser URL).
4. Exchange this code for a token by executing the following request (you can also use `req_example.py` or `req_example.js` provided in the repository):

```sh
curl -X POST "https://id.twitch.tv/oauth2/token" \
     -d "client_id=CLIENT_ID" \
     -d "client_secret=CLIENT_SECRET" \
     -d "code=YOUR_CODE_HERE" \
     -d "grant_type=authorization_code" \
     -d "redirect_uri=http://localhost"
```

5. The response will contain `access_token` and `refresh_token`. Fill these in `example.tokens.125328655.json`, then rename it to `tokens.125328655.json`.

### 2.3. Automatically Refreshing the Token

`access_token` expires periodically. The bot automatically refreshes it and updates `tokens.125328655.json`.

## 3. Bot Configuration

The bot needs to know which TikTok channel to listen to and where to send messages on Twitch.

1. In `config.json`, specify:
   - **The TikTok channel name** to retrieve chat messages from.
   - **The Twitch channel name** where messages should be relayed.

Example:

```json
{
  "tiktokChannel": "tiktoker_name",
  "twitchChannel": "twitch_channel_name",
  "clientId": "YOUR_CLIENT_ID",
  "clientSecret": "YOUR_CLIENT_SECRET"
}
```

## 4. Running the Bot

Once configured, start the bot with:

```sh
node bot.js
```

If everything is set up correctly, you will see TikTok chat messages appearing in the Twitch chat!

The bot is designed to run 24/7 on a server. It will wait for the TikTok channel to go live before relaying chat messages. Note that it will write in the Twitch chat even if the Twitch channel is offline.

## 5. Summary

1. Create a Twitch application and obtain `clientId`, `access_token`, and `refresh_token`.
2. Configure `config.json` with Twitch and TikTok information.
3. Start the bot with `node bot.js`.
4. The bot will automatically relay TikTok chat messages to Twitch.

Make sure to store your tokens securely and check regularly that the bot is functioning correctly. 🚀

