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
              class="talking-space"
            >
              <div
                v-for="(item, index) in messageList"
                :key="index"
                class="message_item"
              >
                {{ item }}
              </div>
            </div>
            <!---聊天框--->
            <div class="chat-controller">
              <div class="chat-input-box">
                <input class="input" placeholder="Send a message or hold space bar to talk" :value="message">
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
      messageList: []
    }
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
  },
  activated() {

  },
  methods: {
    async sendMessage() {
      let { data } = await sendMessage({
        message: this.message
      });
      if (!data.code) {
        this.messageList.push(data.data.message)
      }
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
          .talking-space{
            width: 100%;
            height: 100%;
            padding: 20px 50px;
            box-sizing: border-box;
            .message_item{
              padding: 12px;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 3px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.06);
              transition: box-shadow .2s ease-in-out;
              display: table;
              font-size: 10px;
              margin-bottom: 5px;
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

