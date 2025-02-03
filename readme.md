# Guide : Récupérer les informations d'authentification Twitch

Ce guide explique comment obtenir les informations nécessaires (« clientId », « access_token » et « refresh_token ») pour se connecter au chat Twitch avec Twurple.

## 1. Créer une application Twitch

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

## 2. Obtenir un Access Token et un Refresh Token

Twitch utilise OAuth 2.0 pour l'authentification. Pour obtenir un access token et un refresh token, suivez ces étapes :

### 2.1. Générer un lien d'authentification

Remplacez `CLIENT_ID` par votre Client ID dans l'URL ci-dessous et ouvrez-la dans un navigateur :

```
https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=CLIENT_ID&redirect_uri=http://localhost&scope=chat:read+chat:edit
```

1. Connectez-vous avec votre compte Twitch.
2. Autorisez l'application.
3. Vous serez redirigé vers `http://localhost/?code=VOTRE_CODE_ICI`. Notez le `code` fourni dans l'URL.

### 2.2. Échanger le code contre un Access Token

Utilisez `curl` ou Postman pour envoyer une requête POST à Twitch :

```sh
curl -X POST "https://id.twitch.tv/oauth2/token" \
     -d "client_id=CLIENT_ID" \
     -d "client_secret=CLIENT_SECRET" \
     -d "code=VOTRE_CODE_ICI" \
     -d "grant_type=authorization_code" \
     -d "redirect_uri=http://localhost"
```

### 2.3. Récupérer les Tokens

La réponse JSON contiendra :

```json
{
  "access_token": "VOTRE_ACCESS_TOKEN",
  "refresh_token": "VOTRE_REFRESH_TOKEN",
  "expires_in": 3600,
  "token_type": "bearer"
}
```

Notez bien `access_token` et `refresh_token`.

## 3. Rafraîchir le Token 

Les Access Tokens expirent régulièrement. Utilisez votre Refresh Token pour en obtenir un nouveau :

```sh
curl -X POST "https://id.twitch.tv/oauth2/token" \
     -d "client_id=CLIENT_ID" \
     -d "client_secret=CLIENT_SECRET" \
     -d "grant_type=refresh_token" \
     -d "refresh_token=VOTRE_REFRESH_TOKEN"
```

Vous recevrez un nouveau `access_token` et `refresh_token`.

## Conclusion

Vous avez maintenant les trois éléments requis :
- **Client ID**
- **Access Token**
- **Refresh Token**

Ces informations vous permettent de vous connecter au chat Twitch en utilisant Twurple. Pensez à stocker vos tokens de manière sécurisée et à renouveler l'access token régulièrement !