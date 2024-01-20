<template>
  <div class="departCarCreate">
    <!-- nav-bar -->
    <van-sticky :offset-top="0">
      <van-nav-bar title="demo" left-text="返回" left-arrow @click-left="onClickLeft">
        <template
          #right
        >
          <!-- <div
            v-permission="['/v2/line/lineDockingPeople/saveOrUpdateProjectReceiver']"
            class="headerRight"
            @click="() => {
              opPicker = true
            }"
          >
            操作
          </div> -->
        </template>
      </van-nav-bar>
    </van-sticky>

    <!-- 表单 -->
    <SectionContainer title="title name">
      <CustomForm
        ref="CustomForm"
        :form-item="formItem"
        :list-query="listQuery"
      />
      <!--提交-->
      <van-button type="primary" @click="handleValidateForm">
        提交
      </van-button>
    </SectionContainer>

    <!--弹窗-->
    <van-button type="primary" @click="dialog = true">
      弹窗
    </van-button>
    <van-dialog v-model="dialog" title="标题" show-cancel-button>
      <CustomForm
        :form-item="formItem"
        :list-query="listQuery"
      />
    </van-dialog>

    <!--详情-->
    <CustomDetail :detail="Detail" :active="activeNames">
      <template
        slot="name"
        slot-scope="{row}"
      >
        {{ row.value }}
      </template>
    </CustomDetail>
  </div>
</template>

<script>
import SectionContainer from '@/components/SectionContainer'
import CustomForm from '@/components/CustomForm'
import CustomDetail from '@/components/CustomDetail'
// import { getUserListByDutyId } from '@/api/depart.js'
export default {
  name: 'DepartCarCreate',
  components: {
    SectionContainer,
    CustomForm,
    CustomDetail
  },
  data() {
    return {
      scrollTop: 0,
      dialog: false,
      listQuery: {
        switch: true,
        checkbox: true,
        checkboxGroup: [1],
        radio: '1',
        stepper: 1,
        rate: 3,
        slider: 20,
        uploader: [
          { url: 'https://img01.yzcdn.cn/vant/leaf.jpg',
            file: {
              name: '图片介绍'
            }
          }
        ],
        popup: '',
        datetimePicker: '',
        calendar: '',
        suggestName: '', // 展示用（suggest）
        suggestVal: '', // 获取真正的值传后端（suggest）
        keyWord: '', // 查询关键字（suggest）
        suggestName2: '', // 展示用（suggest）
        suggestVal2: '', // 获取真正的值传后端（suggest）
        keyWord2: '' // 查询关键字（suggest）
      },
      /**
       *
       * name是配置表单的种类(需要配置slot：true/ 为false默认input 或 popup)： switch（开关） / checkbox（复选框） / checkboxGroup（复选框组）
       * key是绑定value值（listQuery中对应的key值）
       * label是表单名称
       * slot是否开启插槽（除input都需要开启）
       * placeholder默认占位提示语
       *
       * */
      formItem: [
        {
          name: 'input',
          key: 'name',
          label: 'input输入',
          slot: false,
          placeholder: '请输入',
          rules: [{ required: true, validator: '/\d{6}/', message: '请输入正确内容' }],
          listeners: {
            'click': () => {

            }
          }
        },
        {
          name: 'switch',
          key: 'switch',
          label: '开关',
          slot: true,
          placeholder: '请输入'
        },
        {
          name: 'checkbox',
          key: 'checkbox',
          label: 'checkbox',
          slot: true,
          placeholder: '请输入',
          listeners: {
            'click': () => {

            }
          }
        },
        {
          name: 'checkboxGroup',
          key: 'checkboxGroup',
          label: 'checkboxGroup',
          slot: true,
          placeholder: '请输入',
          option: [
            { name: '选择1', value: 1 },
            { name: '选择2', value: 2 }
          ],
          listeners: {
            'click': () => {
              console.log(1)
            }
          }
        },
        {
          name: 'radio',
          key: 'radio',
          label: 'radio',
          slot: true,
          placeholder: '请输入',
          option: [
            { name: '选择1', value: 1 },
            { name: '选择2', value: 2 }
          ],
          listeners: {
            'click': () => {
              console.log(1)
            }
          }
        },
        {
          name: 'stepper',
          key: 'stepper',
          label: 'stepper',
          slot: true,
          placeholder: '请输入'
        },
        {
          name: 'rate',
          key: 'rate',
          label: 'rate',
          slot: true,
          count: 6,
          placeholder: '请输入'
        },
        {
          name: 'slider',
          key: 'slider',
          label: 'slider',
          disabled: false,
          slot: true,
          placeholder: '请输入'
        },
        {
          name: 'uploader',
          key: 'uploader',
          label: 'uploader',
          slot: true,
          showName: true,
          placeholder: '请输入'
        },
        {
          name: 'popup',
          key: 'popup',
          label: 'popup',
          slot: false,
          valueKey: 'name',
          placeholder: '请输入',
          readonly: true,
          clickable: true,
          columns: [{ name: '张三', age: 18 }, { name: '李四', age: 28 }],
          showPicker: false,
          index: '1',
          popupEvent: {
            'confirm': (value) => {
              console.log(value)
            },
            'change': (picker, value, index) => {
              console.log(`当前值：${value}, 当前索引：${index}`)
            }
          }
        },
        {
          name: 'datetimePicker',
          key: 'datetimePicker',
          label: 'datetimePicker',
          type: 'time',
          slot: false,
          placeholder: '点击选择时间',
          readonly: true,
          clickable: true,
          showPicker: false,
          timeEvent: {
            'confirm': (value) => {
              console.log(value)
            }
          }
        },
        {
          name: 'calendar',
          key: 'calendar',
          label: 'calendar',
          slot: false,
          placeholder: '点击选择日期',
          readonly: true,
          clickable: true,
          type: 'single', // single 单个日期；multiple 选多个； range 范围；
          tagAttrs: {
            showConfirm: true // 确认按钮展示
          },
          showCalendar: false,
          dateEvent: {
            'confirm': (date) => {
              console.log(date)
              this.listQuery['calendar'] = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
            }
          }
        }
        // {
        //   name: 'suggest',
        //   ref: 'suggest',
        //   key: 'suggestName', // 绑定获取值的key(注意！ 这里是展示的值，不一样！)
        //   label: '客户名称',
        //   api: getUserListByDutyId, // suggest请求接口的key
        //   valKey: 'id', // 选择item中的key值
        //   val: 'suggestVal', // 这里是真正选择获取的值（向后端传）
        //   keyWord: 'keyWord', // 保存输入的关键字，用于回显
        //   format: (obj) => { // suggest格式
        //     {
        //       let title = [obj.nickName, obj.mobile].filter(sub => sub).join('/')
        //       let desc = obj.officeName
        //       return {
        //         title,
        //         desc
        //       }
        //     }
        //   },
        //   query: { dutyId: 2, keyword: '' },
        //   slot: false,
        //   placeholder: '点击查询选择',
        //   readonly: true,
        //   clickable: true,
        //   showSuggest: false,
        //   suggestEvent: {
        //     'finish': (val) => {
        //       console.log(val)
        //     }
        //   }
        // },
        // {
        //   name: 'suggest',
        //   ref: 'suggest2',
        //   key: 'suggestName2', // 绑定获取值的key(注意！ 这里是展示的值，不一样！)
        //   label: '客户名称2',
        //   api: getUserListByDutyId, // suggest请求接口的key
        //   valKey: 'id', // 选择item中的key值
        //   val: 'suggestVal2', // 这里是真正选择获取的值（向后端传）
        //   keyWord: 'keyWord2', // 保存输入的关键字，用于回显
        //   format: (obj) => { // suggest格式
        //     {
        //       let title = [obj.nickName, obj.mobile].filter(sub => sub).join('/')
        //       let desc = obj.officeName
        //       return {
        //         title,
        //         desc
        //       }
        //     }
        //   },
        //   query: { dutyId: 2, keyword: '' },
        //   slot: false,
        //   placeholder: '点击查询选择',
        //   readonly: true,
        //   clickable: true,
        //   showSuggest: false,
        //   suggestEvent: {
        //     'finish': (val) => {
        //       console.log(val)
        //     }
        //   }
        // }
      ],
      Detail: [
        {
          title: 'test-titles',
          name: '1',
          set: [
            { label: '名称', slot: true, name: 'name', value: 'name', width: '100', border: false }
          ]
        },
        {
          title: 'test-titles',
          name: '2',
          set: [
            { label: '名称', name: 'name', value: 'value-name', width: '100', border: false },
            { label: '名称', slot: true, type: 'image', name: 'name', value: 'https://img01.yzcdn.cn/vant/leaf.jpg', width: '100', border: false },
            { label: '名称', slot: true, type: 'tag', name: 'name', value: 'tag', width: '100', border: false },
            { label: '名称', slot: true, type: 'switch', name: 'name', value: true, width: '100', border: false }
          ]
        }
      ],
      activeNames: ['1']
    }
  },
  computed: {
    // 判断是否为日期选择器
    isDateRange() {
      return this.dateLists.includes(this.pickerKey)
    }
  },
  mounted() {
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.replace({
        path: '/departCar'
      })
    },
    // 校验表单
    async handleValidateForm() {
      let CustomForm = await this.$refs.CustomForm.submitForm()
      console.log(CustomForm)
    }
  }
}
</script>

<style lang='scss' scoped>
.departCarCreate {
  background:#F5F7FC;
  .headerRight {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #FFFFFF;
    i {
      margin-left:5px;
    }
  }
  .searchSelect {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #3C4353;
    i {
      transform: rotate(90deg);
    }
  }
  .popup {
    input {
      border: none;
      color: #d8d5d5;
      overflow: hidden;
    }
    .chooseCar {
      span {
        display: inline-block;
        padding: 0 6px;
        margin-right: 2px;
        background-color: rgb(240, 235, 235);
        border-radius: 10px;
      }
    }
  }
}

</style>

<style scoped>
      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #acabbb;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
       color: #acabbb;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #acabbb;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #acabbb;
      }
  .departListContainer >>> .van-info {
    transform: translate(0%, 0);
  }
</style>
