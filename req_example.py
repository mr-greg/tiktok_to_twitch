import requests

url = "https://id.twitch.tv/oauth2/token"
data = {
    "client_id": "TON_CLIENT_ID",
    "client_secret": "TON_CLIENT_SECRET",
    "code": "CODE_OBTENU",
    "grant_type": "authorization_code",
    "redirect_uri": "http://localhost"
}

response = requests.post(url, data=data)
print(response.json())  # Affiche la réponse JSON
