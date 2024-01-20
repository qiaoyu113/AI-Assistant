<template>
  <div class="index">
    <van-nav-bar :title="title" class="nav-title">
    </van-nav-bar>
    <div class="list-wrap">
      123
    </div>
    <footer-tabbar />
  </div>
</template>
<script>
import { Badge } from 'vant';
import { isPermission } from 'filters/index';
import { mapGetters } from 'vuex'
import FooterTabbar from '@/components/FooterTabbar';
export default {
  name: 'Index',
  components: {
    FooterTabbar,
    [Badge.name]: Badge
  },
  data() {
    return {
      totalNum: 0, // 我的待办总数
      tryrunNum: 0,
      actions: [
        {
          name: '工作台',
          value: 0,
          pUrl: ['/api/order/v3/order/getOrderList', '/api/vehicle/v3/vehicle/getVehicleVOList', '/api/maintain/v3/maintain/getMaintenanceList']
        },
        {
          name: '收发车管理',
          value: 1,
          pUrl: ['/api/deliver/v3/recovervehicle/getRecoverListVO', '/api/deliver/v3/serve/getServeDeliverTaskListVO', '/api/deliver/v3/recovervehicle/getRecoverTaskListVO']
        }
      ],
      list: [
        // 工作台
        [
          {
            title: '订单管理',
            url: '/departCar',
            icon: 'depart',
            pUrl: '/api/order/v3/order/getOrderList',
            style: {
              width: '2rem',
              height: '2rem'
            }
          },
          {
            title: '车辆管理',
            url: '/carMrg',
            icon: 'carMgr',
            pUrl: '/api/vehicle/v3/vehicle/getVehicleVOList',
            style: {
              width: '1.2333rem',
              height: '1.3933rem'
            }
          },
          {
            title: '车辆维修',
            url: '/repair',
            icon: 'service',
            pUrl: '/api/maintain/v3/maintain/getMaintenanceList', // 权限
            style: {
              width: '1.2333rem',
              height: '1.3933rem'
            }
          }
        ],
        // 收发车管理
        [
          {
            title: '收车申请',
            url: '/cycleApply',
            icon: 'serviceOrder',
            pUrl: '/api/deliver/v3/recovervehicle/getRecoverListVO',
            style: {
              width: '1.0267rem',
              height: '1.0933rem'
            }
          },
          {
            title: '发车任务',
            url: '/departTask',
            icon: 'departApply',
            pUrl: '/api/deliver/v3/serve/getServeDeliverTaskListVO',
            style: {
              width: '1.0267rem',
              height: '1.0933rem'
            }
          },
          {
            title: '收车任务',
            url: '/cycleTask',
            icon: 'cycleApply',
            pUrl: '/api/deliver/v3/recovervehicle/getRecoverTaskListVO',
            style: {
              width: '1.0267rem',
              height: '1.0933rem'
            }
          }
        ]
      ]
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
    ...mapGetters(['userData']),
    action_com() {
      return this.actions.filter(item => this.setPermissions(item.pUrl))
    }
  },
  mounted() {
    const actionsList = isPermission(this.actions)
    if (actionsList.length > 0) {
      this.activeIndex = localStorage.getItem('HOME_ACTIVE') || actionsList[0].value;
    } else {
      this.showHeader = false;
    }
  },
  activated() {
    this.$bus.$off();
  },
  methods: {
    setPermissions(value) {
      if (typeof value === 'string') {
        value = [value]
      } else {
        this.userData.stringPermissions.push('root')
      }
      const permission = this.userData.stringPermissions
      return permission.some(item => value.includes(item))
    }
  }
};
</script>
<style lang="less" scoped>
.index {
  background: #F5F7FC;
  .nav-title {
    width: 100%;
    position: fixed;
  }
  .list-wrap {
    margin-top: 60px;
    margin-bottom: 50px;
    // height: calc(100% - 100px);
    overflow-y: auto;
    padding:0 10px;
    box-sizing: border-box;
  }
  .list-title:nth-child(1) {
    border: none;
  }
  .list-title {
    // border-top: 5px solid  #EFF2F5;
    font-size: @font-size-md-1;
    color: @gray-9;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 8px;
  }
  .list-title-lebel {
    font-size: 15px;
    font-weight: 600;
    padding: 16px 0 25px 20px;
  }
  .list-content {
    .grid-ct {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      font-size: 47px;
      svg{
        width: 40px;
        height: 34px !important;
      }
    }
    .grid-pic {
      display: block;
      margin: 0 auto;
    }
    .grid-text {
      width: 100%;
      display: flex;
      margin-top: 10px;
      margin-bottom: 25px;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      flex-direction: column;
      font-size: @font-size-xs-1;
      // font-size: 10px;
      color: #838A9D;
      p{
        margin: 0;
        padding: 0;
      }
      p:nth-last-child(1){
        margin-top: 3px;
      }
    }
    ::v-deep {
      .van-grid-item__content--center {
        padding: 0;
        border-radius: 3px;
      }
    }
  }
  .list-badge{
    position: relative;
    display: flex;
  }
  .badge-info{
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    min-width: 0.42667rem;
    padding: 0 0.08rem;
    color: #fff;
    font-weight: 500;
    font-size: 0.32rem;
    line-height: 1.2;
    text-align: center;
    background-color: #ee0a24;
    border: 1px solid #fff;
    border-radius: 0.42667rem;
    transform: translate(50%, -50%);
    transform-origin: 100%;
  }
}
</style>
