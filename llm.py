import http.client
import json
from dotenv import load_dotenv
import os

# 加载 .env 文件中的环境变量
load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')
OPENAI_API_BASE='https://api.chatanywhere.tech/v1'
os.environ["OPENAI_API_KEY"] = openai_api_key
os.environ["OPENAI_API_BASE"] = OPENAI_API_BASE


# from openai import OpenAI
from langchain.llms.openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

llm = OpenAI(
   temperature=0.7,
   api_key=openai_api_key,
   base_url="https://api.chatanywhere.cn/v1"
   )
prompt = PromptTemplate(
    input_variables=["product"],
    template="What is a good name for a company that makes {product}?",
)

# chain = LLMChain(llm=llm, prompt=prompt)
# chain.run("colorful socks")

## 接口请求

conn = http.client.HTTPSConnection("api.chatanywhere.com.cn")
headers = {
   'Authorization': 'Bearer ' + openai_api_key,
   'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
   'Content-Type': 'application/json'
}

def requestChatGPT(content):
   payload = json.dumps({
      "model": "gpt-3.5-turbo",
      "messages": [
         {
            "role": "user",
            "content": content
         }
      ]
   })
   conn.request("POST", "/v1/chat/completions", payload, headers)
   res = conn.getresponse()
   data = res.read()
   # print(data.decode("utf-8"))
   return data.decode("utf-8")

import time
def requestChatVoice(content):
    print(content)
    payload = json.dumps({
    "model": "tts-1",
    "input": content,
    "voice": "alloy"
    })
    conn.request("POST", "/v1/audio/speech", payload, headers)
    res = conn.getresponse()
    data = res.read()
    with open("speak.mp3", "wb") as file:
      file.write(data)
      return "speak.mp3"


