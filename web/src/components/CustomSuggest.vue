<template>
  <div class="SuggestContainer">
    <van-popup
      v-bind="$attrs"
      round
      position="bottom"
      :style="{ height: '90%',width: '100%' }"
      @opened="() => {
        $emit('opened')
      }"
      @click-overlay="closed"
    >
      <van-search
        v-model="keyWord"
        show-action
        :placeholder="placeholder ? placeholder : '请输入搜索关键词'"
        @cancel="onCancel"
        @input="onSearch"
      ></van-search>
      <div class="wrapper">
        <div v-if="options.length > 0">
          <div v-if="loading" class="noData2">
            <van-loading color="#4AA6B7" />
          </div>
          <van-cell
            v-for="item in options"
            v-else
            :key="item[valKey]"
            center
            border
            :title="titleFunc(item) ? titleFunc(item).title : ''"
            @click="() => {
              selectItem.push(item[valKey]);
              handleItemClick(titleFunc(item), item[valKey], keyWord)
            }"
          >
            <template #right-icon>
              <van-icon v-if="selectItem.length && selectItem.indexOf(item[valKey]) > -1" name="success" size="20px" />
            </template>
            <template #label>
              <span v-if="titleFunc(item) ? titleFunc(item).desc : false">{{ titleFunc(item).desc }}</span>
            </template>
          </van-cell>
        </div>
        <div v-else class="noData">
          <van-loading v-if="loading" color="#4AA6B7" />
          <span v-else>{{ noData }}</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { debounce } from '@/utils/index'
export default {
  props: {
    options: {
      required: true,
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/require-default-prop
    api: {
      type: Function
    },
    query: {
      type: Object,
      default: () => ({})
    },
    props: {
      type: Object,
      default: () => ({
        value: 'value',
        label: 'label'
      })
    },
    placeholder: {
      type: String,
      default: ''
    },
    isCellClick: {
      type: Boolean,
      default: true
    },
    pickerKey: {
      type: String,
      default: 'value'
    },
    valKey: {
      type: String,
      default: ''
    },
    titleFunc: {
      type: Function,
      default: () => {}
    },
    custom: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    tipMsg: {
      type: String,
      default: '请选择'
    },
    noData: {
      type: String,
      default: '暂无数据'
    },
    autoFetch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      keyWord: '',
      backup: '',
      selectItem: [],
      firstCome: true,
      count: 0
    }
  },
  watch: {
    keyWord: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal && newVal !== '') {
          // console.log('有值查询')
          this.onSearch()
        } else {
          if (this.autoFetch) {
            // console.log('无值自动查询')
            if (this.$attrs.value && !this.firstCome) {
              this.onSearch()
            }
          }
        }
      },
      deep: true
    },
    $attrs: {
      handler(newVal) {
        if (newVal.value && this.autoFetch && this.firstCome) {
          // console.log('第一次自动展示弹窗')
          this.count = 0
          this.onSearch()
        }
        if (newVal.value && this.autoFetch && !this.firstCome) {
          // console.log('第二次自动展示弹窗', this.count)
          if (this.count === 0) {
            this.count++
            this.onSearch()
          }
        }
        if (!newVal.value && newVal.value !== undefined && this.autoFetch && !this.firstCome) {
          // console.log('关闭弹窗', this.count, 'this.keyWord', this.keyWord)
          this.count = 0
        }
      },
      deep: true
    }
  },
  beforeDestroy() {
    this.selectItem = []
  },
  methods: {
    /**
     * input发生变化
     */
    onSearch: debounce(function() {
      if (this.keyWord) {
        this.$emit('keyWordValue', this.keyWord, this.api, this.query)
      } else {
        if (this.autoFetch) {
          this.awaitKey().then((res) => {
            if (!res) {
              this.$emit('keyWordValue', this.keyWord, this.api, this.query)
            }
          })
        }
        this.firstCome = false;
      }
      this.count++
    }, 200),

    // 等待keyWord
    awaitKey() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.keyWord)
        }, 300)
      })
    },
    /**
     * 点击取消
     */
    onCancel() {
      this.closed()
    },
    /**
     * 点击每一项
     */
    handleItemClick(item, items, keyWord) {
      if (this.type) {
        item.type = this.type
      }
      item.value = items
      item.keyWord = keyWord
      // if (item[this.props.value]) {
      this.$emit('finish', item)
      this.closed()
      // } else {
      //   return this.$toast.fail(this.tipMsg)
      // }
    },
    /**
     * 关闭popup
     */
    closed() {
      this.keyWord = ''
      this.selectItem = []
      this.$emit('closed')
    },
    // 取消
    handleCancelClick() {
      this.selectItem = []
      this.closed()
    }
  }
}

</script>

<style lang='scss' scoped>
.SuggestContainer {
  .wrapper {
    padding-bottom: 20px;
    box-sizing: border-box;
    position: relative;
    height: calc(100% - 54px);
    .content {
      overflow-y: auto;
      height:calc(100% - 50px);
    }
    .btns {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 20px;
      display: flex;
      justify-content: space-around;
      button {
        width:48%;
      }
    }
  }
  .noData {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 16px;
    color: #666;
  }
  .noData2{
    display: flex;
    justify-content: center;
    margin-top: 85%;
    align-items: center;
  }
}
.van-search--show-action{
  // position: fixed;
  width: 100%;
  height: 52px;
  position: sticky;
  z-index: 1;
  top: 0;
}
</style>
