<template>
  <div class="goods-list">
    <router-link tag="div" :to="'/home/goodsinfo/' + item.id" class="goods-item" v-for="item in goodsList" :key="item.id">
      <img :src="item.img_url">
      <h3>{{ item.title }}</h3>
      <div class="goods-info">
        <p class="goods-price">
          <span class="gp-now">{{ item.sell_price }}</span>
          <span class="gp-old">{{ item.market_price }}</span>
        </p>
        <p class="goods-sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link>

    <mt-button type="danger" size="large" @click="getMoreGoods">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data(){
    return {
      goodsList: [],
      pageIndex: 1
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList() { // 获取商品列表数据
      this.$http.get('api/getgoods?pageindex=' + this.pageIndex).then(result => {
        if(result.body.status === 0) {
          this.goodsList = this.goodsList.concat(result.body.message)
          // Toast('加载商品列表成功！')
        } else {
          Toast('加载商品列表失败！')
        }
      })
    },
    getMoreGoods() {
      this.pageIndex ++;
      this.getGoodsList()
    }
  }
}
</script>

<style lang="scss" scope>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 290px;

    img {
      width: 100%;
    }

    h3 {
      font-size: 14px;
    }

    .goods-info {
      background-color: #eee;

      p {
        margin: 0;
        padding: 5px;
      }

      .goods-price {
        .gp-now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }

        .gp-old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }

      .goods-sell {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>