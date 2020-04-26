<template>
  <div class="shopcar-container">
    <div class="mui-card" v-for="(item, i) in shopCarList" :key="item.id">
			<div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-switch v-model="$store.getters.getGoodsSelect[item.id]" @change="selectChanged(item.id, $store.getters.getGoodsSelect[item.id])"></mt-switch>
          <img :src="item.thumb_path" alt="">
          <div class="mcci-info">
            <h3>{{ item.title }}</h3>
            <p>
              <span class="mcci-info-price">￥{{ item.sell_price }}</span>
              <numbox :goodscount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></numbox>
              <a href="#" @click.prevent="deleteGoods(item.id, i)">删除</a>
            </p>
          </div>
        </div>
			</div>
		</div>

    <div class="mui-card">
			<div class="mui-card-content">
        <div class="mui-card-content-inner mcci-compute">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品<span class="compute-num">{{ $store.getters.getComputeNumber.count }}</span>件，总价：<span class="compute-num">￥{{ $store.getters.getComputeNumber.sum }}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
			</div>
		</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import numbox from '../subcomponents/NumBox_ShopCar.vue'

export default {
  data() {
    return {
      shopCarList: []
    }
  },
  created() {
    this.getShopCarList()
  },
  methods: {
    getShopCarList() { // 获取购物车列表数据
      var idArr = []
      this.$store.state.shopCar.forEach(item => idArr.push(item.id))
      if(idArr.length <= 0) {
        return
      }
      this.$http.get('api/goods/getshopcarlist/' + idArr.join(",")).then(result => {
        if(result.body.status === 0) {
          this.shopCarList = result.body.message
          // Toast('获取购物车列表成功！')
        } else {
          Toast('获取购物车列表失败！')
        }
      })
    },
    deleteGoods(id, index) {
      this.shopCarList.splice(index, 1)
      this.$store.commit("deleteGoods", id)
    },
    selectChanged(id, val) {
      this.$store.commit("goodsSelectChanged", { id, isSelected: val })
    }
  },
  components: {
    numbox
  }
}
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;

  .mui-card-content-inner {
    display: flex;
    align-items: center;
  }

  img {
    width: 60px;
    height: 60px;
  }

  .mcci-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3 {
      font-size: 13px;
    }

    .mcci-info-price {
      color: red;
      font-weight: bold;
    }
  }

  .mcci-compute {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .compute-num {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>