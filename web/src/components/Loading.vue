<template>
  <van-popup
    v-model="show"
    :close-on-click-overlay="false"
    style="background-color:transparent"
  >
    <div class="loadingWrap">
      <van-loading v-if="show" type="spinner" />
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      show: false
    }
  }

}
</script>

<style scoped>
.loadingWrap >>>.van-popup{
    background-color: rgba(0,0,0,.7)
}
</style>
