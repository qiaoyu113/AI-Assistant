<template>
  <div class="index">
    <div class="text">
      <div class="slogen">
        Immerse yourself in the Conversation
      </div>
      <div class="subtitle">
        Better understand your AI assistant
      </div>
    </div>
    <div class="btn" @click="goConversationPage">
      Start Chat
      <span class="icon">
        <svg t="1705604908582" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12762" width="200" height="200"><path d="M193.194667 499.165867h288.904533a1293.2096 1293.2096 0 0 0-70.724267-150.493867c-26.8288-46.455467-54.613333-81.339733-77.892266-81.339733s-51.2 34.9184-77.892267 81.339733a1404.074667 1404.074667 0 0 0-77.789867 167.901867 21.162667 21.162667 0 0 1-28.125866 11.9808 22.8352 22.8352 0 0 1-11.4688-29.422934 1451.485867 1451.485867 0 0 1 80.452266-173.738666c34.133333-58.914133 72.977067-103.2192 114.824534-103.2192s80.7936 44.373333 114.824533 103.2192a1452.8512 1452.8512 0 0 1 80.4864 173.738666 1403.153067 1403.153067 0 0 0 77.755733 167.901867c26.8288 46.455467 54.613333 81.339733 77.892267 81.339733s51.2-34.9184 77.892267-81.339733a1295.735467 1295.735467 0 0 0 70.690133-150.493867h-288.9728l-7.0656-17.339733h303.035733a21.162667 21.162667 0 0 1 28.16-11.9808 22.869333 22.869333 0 0 1 11.4688 29.422933 1453.2608 1453.2608 0 0 1-80.4864 173.738667c-34.133333 58.914133-72.977067 103.2192-114.7904 103.2192s-80.7936-44.373333-114.824533-103.2192a1452.680533 1452.680533 0 0 1-80.4864-173.738667H186.0608l7.133867-17.476266z" p-id="12763" fill="#033535" /></svg>
      </span>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Index',
  components: {
  },
  data() {
    return {

    }
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  mounted() {
  },
  activated() {

  },
  methods: {
    goConversationPage() {
      this.$router.replace({
        path: '/conversation',
        query: {

        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
.index {
  // background: #B8F9B4;
  background: linear-gradient(#B8F9B4, 70%, #033535);
  text-align: center;
  .text{
    padding: 40vh 0 5vh 0vh;
    .slogen {
      width:100%;
      color:#033632;
      font-size: 36px;
      font-weight: bold;
      text-align: center;
    }
    .subtitle {
      widows: 100%;
      color:#4C7E63;
      font-size: 18px;
      text-align: center;
      line-height: 40px;
    }
  }
  .btn{
    width: 200px;
    height: 40px;
    line-height: 40px;
    border-radius: 50px;
    background: #033535;
    text-align: center;
    color:#BEFC00;
    font-size: 14px;
    margin: auto;
    cursor: pointer;
    padding:2px;
    .icon{
      display: inline-block;
      border-radius: 100%;
      width: 40px;
      height: 40px;
      background: #BEFC00;
      float: right;
      position: relative;
      svg{
        width: 30px;
        height: 30px;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    }
  }
  .btn:hover {
    transform: scale(1.01);
  }
}
</style>
