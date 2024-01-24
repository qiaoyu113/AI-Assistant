import http.client
import json

def requestChatGPT(content):
   conn = http.client.HTTPSConnection("api.chatanywhere.com.cn")
   payload = json.dumps({
         "model": "gpt-3.5-turbo",
         "messages": [
            {
               "role": "user",
               "content": content
            }
         ]
   })
   headers = {
      'Authorization': 'Bearer sk-bA3wCkQNsJJkTyJSBHIIH08JrF6lshfsTTCpvGFenSWQlBy3',
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
      'Content-Type': 'application/json'
   }
   conn.request("POST", "/v1/chat/completions", payload, headers)
   res = conn.getresponse()
   data = res.read()
   # print(data.decode("utf-8"))
   return data.decode("utf-8")