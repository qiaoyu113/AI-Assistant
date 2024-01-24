<template>
  <div class="conversation">
    <div class="chat-layout">
      <div class="layout-sider">
        <div class="logo">
          AI Assistant
          <span class="line"></span>
        </div>
        <div class="new_chat">
          <svg t="1705609413718" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2347" width="200" height="200"><path d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667zM490.666667 490.666667h-149.482667A21.269333 21.269333 0 0 0 320 512c0 11.861333 9.493333 21.333333 21.184 21.333333H490.666667v149.482667c0 11.690667 9.557333 21.184 21.333333 21.184 11.861333 0 21.333333-9.493333 21.333333-21.184V533.333333h149.482667A21.269333 21.269333 0 0 0 704 512c0-11.861333-9.493333-21.333333-21.184-21.333333H533.333333v-149.482667A21.269333 21.269333 0 0 0 512 320c-11.861333 0-21.333333 9.493333-21.333333 21.184V490.666667z" fill="#BEFC00" p-id="2348" /></svg>
          New Chat
        </div>
      </div>
      <div class="layout-right-sider">
        <div class="layout-content">
          <div class="home-page">
            <!--内容展示区域-->
            <div
              id="chatBox"
              class="talking-space"
            >
              <van-loading v-show="loading" color="#033535" />
              <div
                v-for="(item, index) in choices"
                :key="index"
                class="message_item"
              >
                <div v-if="item.message.role == 'assistant'" class="assistant">
                  <div class="head">
                    <svg t="1705604908582" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12762" width="200" height="200"><path d="M193.194667 499.165867h288.904533a1293.2096 1293.2096 0 0 0-70.724267-150.493867c-26.8288-46.455467-54.613333-81.339733-77.892266-81.339733s-51.2 34.9184-77.892267 81.339733a1404.074667 1404.074667 0 0 0-77.789867 167.901867 21.162667 21.162667 0 0 1-28.125866 11.9808 22.8352 22.8352 0 0 1-11.4688-29.422934 1451.485867 1451.485867 0 0 1 80.452266-173.738666c34.133333-58.914133 72.977067-103.2192 114.824534-103.2192s80.7936 44.373333 114.824533 103.2192a1452.8512 1452.8512 0 0 1 80.4864 173.738666 1403.153067 1403.153067 0 0 0 77.755733 167.901867c26.8288 46.455467 54.613333 81.339733 77.892267 81.339733s51.2-34.9184 77.892267-81.339733a1295.735467 1295.735467 0 0 0 70.690133-150.493867h-288.9728l-7.0656-17.339733h303.035733a21.162667 21.162667 0 0 1 28.16-11.9808 22.869333 22.869333 0 0 1 11.4688 29.422933 1453.2608 1453.2608 0 0 1-80.4864 173.738667c-34.133333 58.914133-72.977067 103.2192-114.7904 103.2192s-80.7936-44.373333-114.824533-103.2192a1452.680533 1452.680533 0 0 1-80.4864-173.738667H186.0608l7.133867-17.476266z" p-id="12763" fill="#033535" /></svg>
                  </div>
                  <div class="content">
                    {{ item.message.content }}
                  </div>
                </div>
                <div v-if="item.message.role == 'user'" class="user">
                  <div class="content">
                    {{ item.message.content }}
                  </div>
                  <div class="head">
                    <svg t="1706052864506" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5048" width="200" height="200"><path d="M958.2 324.7c-24.3-57.5-59.2-109.2-103.5-153.6-44.4-44.4-96-79.2-153.6-103.5-59.6-25.2-122.9-38-188.1-38s-128.5 12.8-188.1 38c-57.5 24.3-109.2 59.2-153.6 103.5-44.4 44.4-79.2 96-103.5 153.6-25.2 59.6-38 122.9-38 188.1s12.8 128.5 38 188.1c24.3 57.5 59.2 109.2 103.5 153.6 44.4 44.4 96 79.2 153.6 103.5 59.6 25.2 122.9 38 188.1 38s128.5-12.8 188.1-38c57.5-24.3 109.2-59.2 153.6-103.5s79.2-96 103.5-153.6c25.2-59.6 38-122.9 38-188.1s-12.8-128.5-38-188.1zM513 924c-226.7 0-411.2-184.5-411.2-411.2S286.3 101.6 513 101.6s411.2 184.5 411.2 411.2S739.7 924 513 924z" p-id="5049" fill="#033535" /><path d="M694.9 624.2c-18.9-6.2-39.2 4.1-45.4 23-19.3 59.1-74.1 98.8-136.4 98.8-59.3 0-113.2-37.2-134.2-92.7-7-18.6-27.8-28-46.4-20.9-18.6 7-28 27.8-20.9 46.4 15.3 40.5 42.2 75.1 77.7 100.1 36.4 25.6 79.2 39.1 123.8 39.1 46.3 0 90.5-14.5 127.7-41.9 36.4-26.9 63.1-63.7 77.1-106.5 6.2-18.9-4.1-39.2-23-45.4zM350 554.1c19.9 0 36-16.1 36-36V334.4c0-19.9-16.1-36-36-36s-36 16.1-36 36v183.7c0 19.9 16.1 36 36 36zM674.1 554.1c19.9 0 36-16.1 36-36V334.4c0-19.9-16.1-36-36-36s-36 16.1-36 36v183.7c0 19.9 16.1 36 36 36z" p-id="5050" fill="#033535" /></svg>
                  </div>
                </div>
              </div>
            </div>
            <!---聊天框--->
            <div class="chat-controller">
              <div class="chat-input-box">
                <input v-model="message" class="input" placeholder="Send a message or hold space bar to talk" @keyup.enter="sendMessage">
                <div class="btn" @click="sendMessage">
                  <svg t="1705610026515" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4394" width="200" height="200"><path d="M921.472 108.48c-19.904-21.44-51.2-29.504-81.088-32.384-31.36-3.008-68.992-1.024-109.44 4.288-81.152 10.624-179.2 35.264-273.472 65.6-94.272 30.336-186.176 66.88-254.976 101.824-34.24 17.408-64 35.072-85.568 51.968a156.928 156.928 0 0 0-27.904 27.136c-7.04 9.216-14.464 22.4-14.336 38.144 0.256 41.472 28.48 70.784 58.56 90.432 30.72 20.096 70.72 35.2 110.464 47.104 40.128 11.968 82.432 21.248 118.72 28.8l12.992 2.688c21.952 4.48 32.896 6.784 43.264 3.712 10.24-3.136 18.24-11.072 34.112-26.88l157.056-157.056a42.688 42.688 0 0 1 60.288 60.288L523.712 560.64c-16.192 16.192-24.32 24.256-27.328 34.752-3.072 10.496-0.64 21.632 4.352 43.904 19.136 86.4 35.776 157.76 52.352 205.824 9.6 28.032 20.544 52.352 34.368 70.208 14.336 18.688 33.92 32.832 59.712 33.92 16 0.768 29.44-6.592 38.528-13.376 9.664-7.168 18.752-16.768 27.136-27.264 16.896-21.12 34.624-50.304 52.288-84.096 35.52-67.84 73.088-158.784 104.96-252.352 31.744-93.568 58.24-191.104 71.04-272.192 6.336-40.448 9.472-78.016 7.68-109.44-1.6-29.888-7.936-61.184-27.328-82.048z" fill="#033535" p-id="4395" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendMessage } from '@/api/conversation.js';

export default {
  name: 'Conversation',
  components: {
  },
  data() {
    return {
      message: '',
      messageList: [],
      choices: [],
      loading: false
    }
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
    this.scrollToBottom()
  },
  activated() {

  },
  methods: {
    async sendMessage() {
      this.loading = true;
      let message = this.message;
      this.message = '';
      this.choices.push({
        message: {
          content: message,
          role: 'user'
        }
      })
      this.scrollToBottom()
      let { data } = await sendMessage({
        message: message
      });
      if (!data.code) {
        this.choices.push(data.data.data.choices[0])
        this.loading = false;
        this.scrollToBottom()
      } else {
        this.message = message;
        this.choices.pop()
        this.scrollToBottom()
      }
    },
    // 定义将滚动条定位在底部的方法
    scrollToBottom() {
      this.$nextTick(() => {
        let chat = this.$el.querySelector('#chatBox')
        console.log(chat.scrollHeight);
        chat.scrollTop = chat.scrollHeight
      })
    }
  }
};
</script>
<style lang="less" scoped>
.conversation {
  background: #033535;
  .chat-layout{
    display: flex;
    .layout-sider {
      flex: 0 0 200px;
      max-width: 200px;
      min-width: 200px;
      width: 200px;
      background: #033535;
      height: 100vh;
      padding: 16px 20px;
      box-sizing: border-box;
      .logo{
        align-items: center;
        width: 100%;
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: -.8px;
        cursor: pointer;
        .line{
          width: 100%;
          border-bottom: 1px solid #555454;
          display: inline-block;
        }
      }
      .new_chat {
        width: 133px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #4C7E63;
        border: none;
        border-radius: 8px;
        color: #BEFC00;
        transition: background .3s ease;
        cursor: pointer;
        margin-top: 20px;
        font-size: 12px;
        font-weight: 500;
        position: relative;
        padding-left: 10px;
        box-sizing: border-box;
        .icon{
          width:14px;
          height:14px;
          position: absolute;
          left: 20px;
          top:13px;
        }
      }
    }
    .layout-right-sider{
      height: 100vh;
      padding: 8px 8px 8px 0;
      background: #033535;
      flex: 1;
      box-sizing: border-box;
      .layout-content{
        height: 100%;
        border-radius: 12px;
        overflow: hidden;
        background: #f6f6f6;
        .home-page{
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          // align-items: center;
          position: relative;
          overflow: hidden;
          #chatBox{
            overflow-y: auto;
          }
          .talking-space{
            width: 100%;
            height: 100%;
            padding: 20px 50px;
            margin-bottom: 120px;
            box-sizing: border-box;
            .message_item{
              width: 100%;
              padding: 10px 12px 0 12px;
              display: table;
              font-size: 10px;
              margin-bottom: 5px;
              .assistant{
                width: 100%;
                display: flex;
                padding-bottom: 10px;
                .head{
                  width: 30px;
                  min-width: 30px;
                  height: 30px;
                  border-radius: 100%;
                  background: #BEFC00;
                  margin-right: 10px;
                  text-align: center;
                  svg{
                    width: 20px;
                    height: 20px;
                    margin-top: 5px;
                  }
                }
                .content{
                  max-width: 70%;
                  padding: 12px;
                  background: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 2px 3px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.06);
                  transition: box-shadow .2s ease-in-out;
                  float: right;
                }
              }
              .user{
                width: 100%;
                display: flex;
                justify-content: flex-end;
                .head{
                  width: 30px;
                  min-width: 30px;
                  height: 30px;
                  border-radius: 100%;
                  background: #fff;
                  margin-left: 10px;
                  text-align: center;
                  svg{
                    width: 20px;
                    height: 20px;
                    margin-top: 5px;
                  }
                }
                .content{
                  max-width: 70%;
                  padding: 12px;
                  background: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 2px 3px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.06);
                  transition: box-shadow .2s ease-in-out;
                  float: right;
                }
              }
            }
          }
          .chat-controller{
            width: 80%;
            padding: 12px;
            background: #ffffff;
            border: 1px solid rgba(0,0,0,.12);
            border-radius: 12px;
            box-shadow: 0 2px 3px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.06);
            position: absolute;
            left:0;
            right:0;
            bottom: 50px;
            margin: auto;
            .chat-input-box{
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: flex-end;
              position: relative;
              gap: 8px;
              padding: 2px;
              .input{
                width: 100%;
                height: 25px;
                margin: 0;
                padding: 0;
                border: 0;
                outline: 0;
                font-size: 100%;
                vertical-align: baseline;
                background: transparent;
                font-family: Poppins;
                -webkit-font-smoothing: antialiased;
                border: 1px solid rgba(0,0,0,.12);
                border-radius: 3px;
                font-size: 10px;
                color:#033535;
                padding: 8px;
                box-sizing: border-box;//其他浏览器
                -webkit-box-sizing: border-box;//谷歌
                -moz-box-sizing: border-box;//火狐
              }
              .btn{
                width: 50px;
                height: 25px;
                line-height: 33px;
                background: #BEFC00;
                text-align: center;
                border-radius: 3px;
                cursor: pointer;
                svg{
                  width: 12px;
                  height: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

<style>
.van-loading{
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>

