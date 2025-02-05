import requests

url = "https://id.twitch.tv/oauth2/token"
data = {
    "client_id": "z4fm64wtjcpa1kkfwybrqe6pe7k514",
    "client_secret": "oimc5d08sanes93tx7ecgfdiurgrc1",
    "code": "z89mrselkq8478qqjyc80fbobqjrhz",
    "grant_type": "authorization_code",
    "redirect_uri": "http://localhost"
}

response = requests.post(url, data=data)
print(response.json())  # Affiche la réponse JSON
