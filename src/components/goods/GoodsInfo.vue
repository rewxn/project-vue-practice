<template>
  <div class="goods-info">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballDisplay" ref="ball"></div>
    </transition>

    <!-- 轮播图区域 -->
    <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swipe :swipeImg="goodsImg" :isFullWidth="false"></swipe>
				</div>
			</div>
		</div>

    <!-- 购买区域 -->
		<div class="mui-card">
			<div class="mui-card-header">{{ goodsInfo.title }}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{ goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsInfo.sell_price }}</span>
          </p>
          <p class="gi-numbox">购买数量：<numbox @getCount="getSelectedCount" :maxCount="goodsInfo.stock_quantity"></numbox></p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
				</div>
			</div>
		</div>

    <!-- 详情区域 -->
    <div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{ goodsInfo.goods_no }}</p>
					<p>库存情况：{{ goodsInfo.stock_quantity }}</p>
					<p>上架时间：{{ goodsInfo.add_time | dateFormat }}</p>
				</div>
			</div>
			<div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
		</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import swipe from '../subcomponents/Swipe.vue'
import numbox from '../subcomponents/NumBox_GoodsInfo.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,
      goodsImg: [],
      goodsInfo: {},
      ballDisplay: false, // 控制加入购物车的小球显示或隐藏
      selectedCount: 1
    }
  },
  created() {
    this.getGoodsImg()
    this.getGoodsInfo()
  },
  methods: {
    getGoodsImg() { // 获取商品详情轮播图数据
      this.$http.get('api/getthumimages/' + this.id).then(result => {
        if(result.body.status === 0) {
          this.goodsImg = result.body.message
          this.goodsImg.forEach(item => {
            item.img = item.src
          })
          // Toast('获取商品详情轮播图成功！')
        } else {
          Toast('获取商品详情轮播图失败！')
        }
      })
    },
    getGoodsInfo() { // 获取商品详情数据
      this.$http.get('api/goods/getinfo/' + this.id).then(result => {
        if(result.body.status === 0) {
          this.goodsInfo = result.body.message[0]
          // Toast('获取商品详情成功！')
        } else {
          Toast('获取商品详情失败！')
        }
      })
    },
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } })
    },
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } })
    },
    addToShopCar() {
      this.ballDisplay = !this.ballDisplay
      var goodsToCar = { id: this.id, count: this.selectedCount, price: this.goodsInfo.sell_price, isSelected: true }
      this.$store.commit('addToShopCar', goodsToCar)
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)"
    },
    enter(el, done) {
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      const badgePosition = document.getElementById("badge").getBoundingClientRect()
      const xDist = badgePosition.left - ballPosition.left
      const yDist = badgePosition.top - ballPosition.top
      
      el.offsetWidth
      el.style.transform = `translate(${xDist}px, ${yDist}px)`
      el.style.transition = "all 0.5s cubic-bezier(.4, -0.3, 1, .68)"
      done()
    },
    afterEnter(el) {
      this.ballDisplay = !this.ballDisplay
    },
    getSelectedCount(count) {
      this.selectedCount = count
    }
  },
  components: {
    swipe,
    numbox
  }
}
</script>

<style lang="scss" scope>
.goods-info {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;

    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    z-index: 666;
    position: absolute;
    top: 390px; 
    left: 150px;
  }
}
</style>