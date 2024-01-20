<template>
  <div class="customDialog">
    <van-dialog
      v-model="showDialog"
      :title="title"
      :show-cancel-button="showCancelButton"
      :show-confirm-button="showConfirmButton"
      :confirm-button-text="confirmButtonText"
      :cancel-button-text="cancelButtonText"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div slot class="dialogTitle">
        {{ dialogTitle }}
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'CustomDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    showCancelButton: {
      type: Boolean,
      default: false
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    dialogTitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    showDialog: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  methods: {
  }

}
</script>

<style scoped lang="scss">
.dialogTitle{
    padding: 0 30px ;
    font-size: 14px;
    color: #666;
}
</style>
<style scoped>
.customDialog >>> .van-button__content{
  font-size: 12px;
}
</style>
