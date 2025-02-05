const fetch = require('node-fetch');

const url = "https://id.twitch.tv/oauth2/token";
const params = new URLSearchParams({
    client_id: "TON_CLIENT_ID",
    client_secret: "TON_CLIENT_SECRET",
    code: "TON_CODE",
    grant_type: "authorization_code",
    redirect_uri: "http://localhost"
});

fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error("Erreur :", err));
