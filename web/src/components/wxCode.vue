<template>
  <div v-if="url" class="wxCodeContainer" @click.stop="preview">
    <van-grid-item>
      <div class="grid-ct flex-sub">
        <img v-lazy="url" class="grid-pic wxIcon">
        <div class="grid-text">
          我的推广码
        </div>
      </div>
    </van-grid-item>
  </div>
</template>

<script>
import { GetcreateQrCodeFrontUrl } from '@/api/driver.js'
import { ImagePreview } from 'vant';
// import { Lazyload } from 'vant';
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
    // [Lazyload.Component.name]: Lazyload.Component
  },
  data() {
    return {
      url: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        let { data: res } = await GetcreateQrCodeFrontUrl()
        if (res.success) {
          this.url = res.data
        } else {
          // this.$toast.fail(res.errorMsg)
          this.url = ''
        }
      } catch (err) {
        console.log(`get wx code fail:${err}`)
      }
    },
    // 预览
    preview() {
      ImagePreview({
        images: [this.url],
        closeable: true
      });
    }
  }
}

</script>

<style lang='less' scoped>
.wxCodeContainer {
  width: 100%;
  height: 100%;
  .grid-ct {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
    }
  }
  .grid-text {
    margin-top: 10px;
    margin-bottom: 25px;
    font-size: 12px;
    color: #838a9d;
  }
}
</style>
