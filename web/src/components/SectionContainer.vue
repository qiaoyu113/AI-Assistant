<template>
  <div
    class="SectionContainer"
  >
    <div class="title">
      <span>{{ title }}<span class="border" /></span>
      <slot name="rightBox" />
    </div>
    <div class="context_d">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'SectionContainer',
  props: {
    title: {
      type: String,
      default: () => '',
      required: true
    }
  },
  data: function() {
    return {
    };
  },
  watch: {
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    }
  }
}
</script>

<style lang="scss" scope>
.SectionContainer{
    width: 100%;
    background: #FFFFFF;
    margin-bottom: 4px;
    box-shadow: 4px 4px 10px 0 rgba(218,218,218,0.50);
    .title{
        height: 45px;
        line-height: 40px;
        font-size: 15px;
        color: #4A4A4A;
        font-weight: 500;
        border-bottom: 1px solid #E4E4E5;
        position: relative;
        padding:0 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .border{
            width: 4px;
            height: 14px;
            position: absolute;
            left: 10px;
            top: -1px;
            bottom: 0;
            margin: auto;
            background-image: linear-gradient(270deg, #FF9600 0%, #FFB400 100%);
            border-radius: 2.5px;
            border-radius: 2.5px;
            display: inline-block;
        }
    }
    .context{
        width:100%;
        padding: 20px 30px;
        box-sizing: border-box;
    }
    .context_d{
        width:100%;
    }
}
</style>
