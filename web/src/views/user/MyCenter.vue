<template>
  <div class="mycenter">
    <van-nav-bar title="个人中心" />

    <div class="list-wrap">
      <div class="list-title">
        <div class="list-title-lebel">
          帐号信息
        </div>
        <div class="list-content">
          <van-row gutter="24">
            <van-col class="grid-name" span="12">
              帐号
            </van-col>
            <van-col class="grid-text" span="12">
              {{ name }}
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <div class="cell-top">
      <van-cell title="修改密码" is-link @click="toResetPwd" />
    </div>
    <div class="cell-top">
      <van-cell title="帮助" is-link @click="toHelp" />
    </div>
    <div
      style="padding: 30px; box-sizing: border-box"
    >
      <van-button
        style="margin-top: 40%"
        color="#4AA6B7"
        round
        block
        @click="removeLocal"
      >
        退出登录
      </van-button>
    </div>
    <footer-tabbar />
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Toast, Tab, Tabs } from 'vant'
import FooterTabbar from '@/components/FooterTabbar'
export default {
  name: 'MyCenter',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    FooterTabbar
  },
  data() {
    return {
      name: ''
    }
  },
  mounted() {
    let obj = localStorage.getItem('userDate')
    obj = JSON.parse(obj)
    this.name = obj.bssLoginName
  },
  methods: {
    removeLocal() {
      this.$store.commit('user/SETRESETPWD', false)
      localStorage.clear();
      this.$router.replace({
        name: 'login'
      })
    },
    toResetPwd() {
      this.$router.replace({
        name: 'ResetPwd'
      })
    },
    toHelp() {
      window.location.href = 'https://docs.qq.com/doc/DTFNia1pWT1liblNq'
    }
  }
}
</script>
<style lang="less" scoped>
.mycenter {
  width: 100%;
  .list-wrap {
    margin-top: 20px;
    margin-bottom: 40px;
    overflow-y: auto;
    padding:0 10px;
    box-sizing: border-box;
  }
  .list-title {
    font-size: @font-size-md-1;
    color: @gray-9;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    padding-bottom: 15px;
    border: 2px solid #DFF2F5;
  }
  .list-title-lebel {
    font-size: 15px;
    font-weight: 600;
    padding: 16px 0 15px 20px;
  }
  .list-content {
    padding: 0 20px;
    box-sizing: border-box;
    line-height: 24px;
    .grid-name {
      text-align: left;
      justify-content: left;
      color: #333;
      font-size: 13px;
    }
    .grid-text {
      text-align: right;
      justify-content: right;
      color: #838A9D;
      font-size: 13px;
    }
    ::v-deep {
      .van-grid-item__content--center {
        padding: 0;
        border-radius: 3px;
      }
    }
  }
}
.cell-top{
  margin-top: 20px;
  color: #333;
  font-weight: 600;
  font-size: 22px;
  padding: 0 10px;
  box-sizing: border-box;
  .van-cell{
    border: 2px solid #DFF2F5;
    border-radius: 16px;
  }
}
</style>
