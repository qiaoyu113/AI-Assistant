import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';

Vue.use(VeeValidate, {
  i18nRootKey: 'validation',
  dictionary: {
    zh_CN
  }
});
// 自定义错误消息
const Dictionary = {
  zh_CN: {
    messages: {
      required: (value) => value + '必须填写'
    },
    /**
       * 模式提示 name 属性
       * 有 data-vv-as 提示其对应的值
       *  */
    attributes: {
      email: '邮箱',
      mobile: '电话号码',
      idCard: '身份证号码',
      bankCard: '银行卡号'
    }
  }
};
Validator.localize(Dictionary);
