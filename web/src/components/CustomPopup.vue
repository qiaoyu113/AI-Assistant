<template>
  <div class="CustomPopup">
    <van-popup
      v-model="showPopup"
      :position="position"
    >
      <van-form
        :ref="formRef"
        :show-error="false"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <div class="top">
          <van-cell-group>
            <slot />
          </van-cell-group>
        </div>
        <div class="bottom">
          <van-button block plain type="primary" size="normal" native-type="button" @click="onReset">
            重置
          </van-button>
          <van-button v-preventreclick block type="primary" size="normal" native-type="submit">
            查询
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'CustomPopup',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'right'
    },
    formRef: {
      type: String,
      default: 'form'
    }
  },
  computed: {
    showPopup: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  methods: {
    onReset() {
      this.$emit('reset', this.$refs[this.formRef])
    },
    onSubmit() {
      this.$emit('submit', this.$refs[this.formRef])
    }
  }
}
</script>
<style lang="scss" scoped>
.CustomPopup .van-form{
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #F5F7FC;
  padding: 10px;
  box-sizing: border-box;
}
.CustomPopup .top{
  flex: 1;
  overflow: auto;
}
.CustomPopup .bottom{
  padding: 10px 8px;
  display: flex;
  // background-color: #fff;
}
.CustomPopup .van-button + .van-button{
  margin-left: 5px;
}
</style>
<style scoped>
.CustomPopup >>> .van-popup{
  width: 80%;
  height: 100vh;
  box-sizing: border-box;
}
.CustomPopup >>> .van-cell-group{
  border-radius: 12px;
  box-shadow: 0px 0 0.10667rem 0.10667rem rgb(0 0 0 / 2%);
  overflow: hidden;
}
.CustomPopup >>> [class*='van-hairline']::after{
  border: none;
}
</style>
