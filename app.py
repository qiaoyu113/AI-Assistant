# from flask import Flask, render_template, request, flash, redirect, url_for, send_from_directory

# app = Flask(__name__)

# @app.route('/')

# def index():
#     return render_template('index.html')

# @app.route('/#/about')
# def about():
#     return 'Hello, World'

# @app.route('/getting')
# def about():
#     return {'greeting': 'Hello, Vue!'}


# @app.route('/hello/<name>')

# def hello(name):
#     return render_template('page.html', name=name)


# if __name__ == '__main__':
#     app.run(debug=True, host='http://172.30.198.2:8080')

from flask import Flask, request,jsonify,json
from flask_cors import CORS, cross_origin

# import google.generativeai as genai

# genai.configure(api_key="")
# for m in genai.list_models():
#   if 'generateContent' in m.supported_generation_methods:
#     print(m.name)
# context = """你是一个30岁左右的程序员，下面的乙这个角色，正在跟朋友聊天，
#     请根据已有的聊天内容，产生对应的对话内容，要求：
#     1. 字数不要超过30个字；
#     2. 如果没有合适的回复内容，给上一条回复给出点赞的话语；
#     3. 产生对话内容，只要内容，不用出现'乙：'这样的说明作者的部分。

#     下面三个波浪线包含的部分是聊天历史内容：
#     ~~~
#     甲：你好！最近怎么样？
#     乙：我很好，谢谢。你呢？
#     甲：我也不错。最近在忙些什么？
#     乙：我在学习新的编程语言，挺有趣的。你呢？
#     甲：我最近在准备一个旅行计划。
#     乙：哦，听起来很棒！你打算去哪里？
#     甲：我打算去日本。一直很想去那里看樱花。
#     ~~~
#     """
# model = genai.GenerativeModel('gemini-pro') 
# response = model.generate_content(context)
# print(1111, response.text)

import llm
app = Flask(__name__)
Cors = CORS(app)
CORS(app, resources={r'/*': {'origins': '*'}},CORS_SUPPORTS_CREDENTIALS = True)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/api/common/v3/sendMessage", methods=["GET","POST"])

def submitData():
  response_object = {'code': 0}
  if request.method == "POST":
    message = request.json.get('message')

    res = llm.requestChatGPT(message)
    res_data = json.loads(res)
    response_object['data'] = {
      'data': res_data
    }
    return jsonify(response_object)
  

if __name__ == '__main__':    
   app.run(debug=True)
   