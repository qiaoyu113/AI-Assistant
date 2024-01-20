<template>
  <div class="CustomForm">
    <van-form ref="form">
      <div
        v-for="(item, index) in formItem"
        :key="index"
      >
        <div
          v-if="item"
          class="CustomFormList"
        >
          <van-field
            v-if="!item.fieldHidden"
            :name="item.name"
            :label-width="item.w ? item.w : 100"
            :value="item.slot ? '' : listQuery[item.key]"
            :required="item.rules && item.rules[0] ? item.rules[0].required : false"
            :input-align="item.align || 'right'"
            :readonly="item.readonly || false"
            :clickable="item.clickable || false"
            :disabled="item.disabled || false"
            :label="item.label"
            :placeholder="item.placeholder || '请输入'"
            :rules="item.rules || [{ required: false }]"
            error-message-align="right"
            v-bind="item.tagAttrs || {}"
            v-on="item.listeners"
            @input="(val) => {listQuery[item.key] = val}"
            @click="() => {
              if((item.name === 'popup' || item.name === 'datetimePicker') && !item.disabled) item.showPicker = true;
              if(item.name === 'calendar' && !item.disabled) item.showCalendar = true;
              if(item.name === 'suggest' && !item.disabled) item.showSuggest = true;
            }"
          >
            <template v-if="item.slotlabel" #label>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div v-html="item.slotlabel"></div>
            </template>
            <template v-if="item.slot" #input>
              <!--switch-->
              <van-switch v-if="item.name === 'switch'" v-model="listQuery[item.key]" :active-color="item.color || '#4AA6B7'" :inactive-color="item.inactiveColor || '#4AA6B7'" size="20" v-on="item.listeners" />
              <!--checkbox-->
              <van-checkbox v-if="item.name === 'checkbox'" v-model="listQuery[item.key]" shape="square" />
              <!--checkboxGroup-->
              <van-checkbox-group v-if="item.name === 'checkboxGroup'" v-model="listQuery[item.key]" direction="horizontal">
                <van-checkbox v-for="(i, indexs) in item.option" :key="indexs" :name="i.value" shape="square">
                  {{ i.name }}
                </van-checkbox>
              </van-checkbox-group>
              <!--radio-->
              <van-radio-group v-if="item.name === 'radio'" v-model="listQuery[item.key]" direction="horizontal">
                <van-radio v-for="(i, indexs) in item.option" :key="indexs" :name="i.value">
                  {{ i.name }}
                </van-radio>
              </van-radio-group>
              <!--stepper-->
              <van-stepper v-if="item.name === 'stepper'" v-model="listQuery[item.key]" />
              <!--rate-->
              <van-rate
                v-if="item.name === 'rate'"
                v-model="listQuery[item.key]"
                :color="item.color || '#E4B242'"
                :count="item.count || 5"
              />
              <!--slider-->
              <van-slider
                v-if="item.name === 'slider'"
                v-model="listQuery[item.key]"
                :min="item.min || '0'"
                :max="item.max || '50'"
                :disabled="item.disabled || false"
                :step="item.step || 1"
                :bar-height="item.height || '4px'"
                :active-color="item.color || '#4AA6B7'"
              >
                <template #button>
                  <div class="custom-button">
                    {{ listQuery[item.key] }}
                  </div>
                </template>
              </van-slider>
              <!--uploader-->
              <van-uploader
                v-if="item.name === 'uploader'"
                v-model="listQuery[item.key]"
                :after-read="item.afterRead || afterRead"
                :max-count="item.count || 5"
                :max-size="item.size || 10000 * 1024"
                :before-read="beforeRead"
                :accept="item.accept ? '' : 'image/*'"
                multiple
                @delete="onDelete(listQuery[item.key])"
                @oversize="onOversize"
              >
                <template v-if="item.showName" #preview-cover="{ file }">
                  <div v-if="file" class="preview-cover van-ellipsis">
                    {{ file.name }}
                  </div>
                </template>
              </van-uploader>
              <!-- 表单内其它类型 -->
              <slot
                v-else
                :name="item.key"
                :row="{...item,...{tagAttrs: item.tagAttrs || {}}, ...{listeners: item.listeners}}"
              />
            </template>
          </van-field>
          <van-popup v-if="!item.outSlot" v-model="item.showPicker" position="bottom">
            <!--popup-->
            <van-picker
              v-if="item.name === 'popup'"
              show-toolbar
              :columns="item.columns"
              :value-key="item.valueKey"
              :default-index="item.index || 0"
              v-bind="item.tagAttrs || {}"
              v-on="item.popupEvent"
              @confirm="(val) => { listQuery[item.key] = val[item.valueKey];item.showPicker = false }"
              @cancel="item.showPicker = false"
            />
            <!--时间选择器-->
            <van-datetime-picker
              v-if="item.name === 'datetimePicker'"
              :type="item.type || 'time'"
              v-bind="item.tagAttrs || {}"
              v-on="item.timeEvent"
              @confirm="(val) => { listQuery[item.key] = val;item.showPicker = false }"
              @cancel="item.showPicker = false"
            />
          </van-popup>
          <!---日期选择器--->
          <van-calendar
            v-if="item.name === 'calendar' && !item.outSlot"
            v-model="item.showCalendar"
            color="#4AA6B7"
            :type="item.type"
            v-bind="item.tagAttrs || {}"
            v-on="item.dateEvent"
            @confirm="(date) => { item.showCalendar = false }"
          />
          <!-- Suggest -->
          <Suggest
            :ref="item.ref"
            v-model="item.showSuggest"
            :options="optionSuggest"
            :title-func="item.format"
            :picker-key="item.pickerKey"
            :val-key="item.valKey"
            :no-data="item.noData || '暂无数据'"
            :tip-msg="item.tipMsg || '请选择'"
            :api="item.api"
            :query="item.query"
            :loading="suggestLoading"
            :auto-fetch="item.autoFetch"
            v-bind="item.tagAttrs || {}"
            v-on="item.suggestEvent"
            @keyWordValue="handleSearchChange(arguments)"
            @finish="(val) => { listQuery[item.key] = val.title;listQuery[item.val] = val.value;listQuery[item.keyWord] = val.keyWord}"
            @opened="() => {
              opened(item)
            }"
            @closed="item.showSuggest=false; optionSuggest = []"
          />
          <slot
            v-if="item.outSlot"
            :name="item.key"
            :row="{...item,...{tagAttrs: item.tagAttrs || {}}, ...{listeners: item.listeners}}"
          />
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { client } from '@/utils/alioss';
import Suggest from '@/components/CustomSuggest'
export default {
  name: 'CustomForm',
  components: {
    Suggest
  },
  props: {
    formItem: {
      type: Array,
      default: () => [],
      required: true
    },
    listQuery: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data: function() {
    return {
      showPicker: false,
      suggestLoading: false,
      optionSuggest: [],
      upLoading: false
    };
  },
  watch: {
    // listQuery: {// 深度监听，可监听到对象、数组的变化		    // formItem: {// 深度监听，可监听到对象、数组的变化
    //   handler(val, oldVal) {
    //     console.log(val.oaNum)
    //   },
    //   deep: true // true 深度监听
    // }
  },
  methods: {
    afterRead(file) {
      if (file.constructor === Object) {
        file = [file]
      }
      var that = this
      for (var i = 0; i < file.length; i++) {
        (function(i) {
          let fileItem = file[i]
          that.upLoading = true;
          fileItem.status = 'uploading'
          fileItem.message = '上传中...';
          let len = len || 32;
          var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
          var maxPos = $chars.length;
          var pwd = '';
          for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos)); // 生成32位随机字符
          }
          let name = fileItem.file.name
          var pos = name.indexOf('.');
          let type = name.substr(pos);
          let datas = new Date()
          let year = String(datas.getFullYear()) + String(datas.getMonth()) + String(datas.getDate())
          var fileName = 'mfh5/' + year + '/' + `${Date.parse(new Date())}` + pwd + type // 文件名称（时间戳+随机字符+后缀）
          client().multipartUpload(fileName, fileItem.file).then(res => {
            that.upLoading = false;
            let imageUrlObj = {}
            imageUrlObj.fileName = res.res.requestUrls[0]
            // imageUrlObj.fileUrl = res.res.requestUrls[0]
            // 2021-11-01 zhh
            imageUrlObj.fileUrl = res.res.requestUrls[0].split('?')[0]
            imageUrlObj.fileType = 1
            imageUrlObj.type = 1
            // that.imageUrl = imageUrlObj
            fileItem.obj = imageUrlObj
            fileItem.status = ''
            fileItem.message = '';
          }).catch((err) => {
            that.upLoading = false;
            console.log('err', err)
          })
        }(i))
      }
    },
    onOversize(file) {
      Toast('文件大小不能超过 10MB');
    },
    onDelete(file) {
      console.log(file)
    },
    // 返回布尔值
    beforeRead(file) {
      if (file.constructor !== Array) {
        file = [file]
      }
      let accept = false
      for (var j = 0; j < this.formItem.length; j++) {
        if (this.formItem[j].name === 'uploader') {
          if (this.formItem[j].count < file.length) {
            Toast(`请上传${this.formItem[j].count}张以内`);
            return false
          }
          // 是否开启无限制上传类型
          if (this.formItem[j].accept) {
            accept = true
          }
        }
      }
      for (var i = 0; i < file.length; i++) {
        if (!accept) {
          if (file[i].type !== 'image/jpeg') {
            Toast('请上传 jpg 格式图片');
            return false;
          }
          return true
        } else {
          if (file[i].type !== 'image/jpeg' && file[i].type !== 'application/pdf' && file[i].type !== 'image/gif') {
            Toast('请上传 PDF、JPG、GIF 格式的文件');
            return false;
          }
          return true
        }
      }
    },
    // 返回 Promise
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片');
          reject();
        } else {
          let img = new File(['foo'], 'bar.jpg', {
            type: 'image/jpeg'
          });
          resolve(img);
        }
      });
    },
    async submitForm() {
      // 全局表单验证
      let type = await this.$refs.form.validate().then(() => {
        if (this.upLoading) {
          Toast('图片正在上传中');
          return false
        }
        return true
      }).catch((err) => {
        console.log(err)
        return false
      })
      return type
    },
    // resetValidation 重置表单验证
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    // suggest模糊搜索
    async handleSearchChange(argument) {
      this.suggestLoading = true;
      let query = argument[2]
      query.keyword = argument[0]
      let Api = argument[1]
      let res = await Api(query)
      this.suggestLoading = false
      this.optionSuggest = res.data.data
    },
    opened(item) {
      this.$refs[item.ref][0].keyWord = this.listQuery[item.keyWord] || ''
      this.$refs[item.ref][0].selectItem.push(this.listQuery[item.val] || '')
    }
  }
}
</script>

<style lang="scss" scope>
// * { touch-action: none; }
.CustomForm{
  width: 100%;
  .custom-button{
    background: #4AA6B7;
    padding: 0 10px;
    border-radius: 12px;
    color: #fff;
  }
  .preview-cover {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
  }
  .CustomFormList {
    border-bottom: 1px solid #E4E4E5;
  }
  .CustomFormList ::after{
    border: none;
  }
  .van-popup{
    width: 100%;
  }
}
</style>

