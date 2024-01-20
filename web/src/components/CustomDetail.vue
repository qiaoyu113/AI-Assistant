<template>
  <div class="DetailContainer">
    <van-collapse v-model="activeVal">
      <van-collapse-item v-for="(item, index) in detail" :key="index" :title="item.title" :name="item.name" :class="item.expand ? '' : 'van-collapse-item-expand'">
        <div
          v-if="!item.slot"
        >
          <van-field
            v-for="(i, ins) in item.set"
            :key="ins"
            :label="i.label"
            :left-icon="i.licon"
            :right-icon="i.ricon"
            :label-width="i.width || 100"
            readonly
            :value="!i.slot ? ( i.value || '暂无数据' ) : ''"
            :border="i.border || false"
            colon
            :input-align="item.align || 'right'"
            v-bind="i.tagAttrs || {}"
          >
            <template #extra>
              <slot
                v-if="i.slot && !i.type"
                :name="i.name"
                :row="{...i}"
              />
              <van-tag v-else-if="i.type === 'tag'" :type="i.value ? 'success' :'warning'">
                {{ i.value? '正常' : '异常' }}
              </van-tag>
              <van-switch v-else-if="i.type === 'switch'" v-model="i.value" />
              <!-- zhh-2021-12-08 span-->
              <span v-else-if="i.type === 'span'">{{ i.value }}</span>
              <div v-else-if="i.type === 'image'">
                <img v-if="(typeof i.value=='string')&&i.value.constructor==String" class="image" :src="i.value || ''" @click="imagePreview(i.value)">
                <!-- zhh-2021-10-13 -->
                <div v-if="(typeof i.value=='object')&&i.value.constructor==Array" class="grid">
                  <img v-for="(imgs, indexs) in i.value" :key="indexs" class="image" :src="imgs || ''" @click="imagePreview(imgs)">
                </div>
              </div>
            </template>
          </van-field>
        </div>
        <slot v-else :name="item.name" />
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
  props: {
    detail: {
      type: Array,
      default: () => [],
      required: true
    },
    active: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data: function() {
    return {
      activeVal: []
    };
  },
  watch: {
    active: {// 深度监听，可监听到对象、数组的变化
      immediate: true,
      handler(val, oldVal) {
        this.activeVal = val
      },
      deep: true // true 深度监听
    }
  },
  methods: {
    imagePreview(url) {
      ImagePreview([url]);
    }
  }
}
</script>

<style lang='scss' scoped>
.DetailContainer {
    width: 100%;
    background: #F5F7FC;
    overflow: hidden;
    .image {
        width: 200px;
    }
    [class*='van-hairline']::after{
        border: none;
    }
    .van-collapse-item--border::after{
        border: none;
    }
    .van-collapse-item-expand{
        margin: 10px;
        box-sizing: border-box;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0px 0 0.10667rem 0.10667rem rgb(0 0 0 / 2%)
    }
}
</style>

<style scoped>
.DetailContainer >>> .van-cell::after {
    border-bottom: 3px solid #F5F7FC !important;
}
</style>
