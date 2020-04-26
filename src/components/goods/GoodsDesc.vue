<template>
  <div class="goods-desc">
    <h3>{{ goodsDesc.title }}</h3>
    <hr>
    <div class="gd-content" v-html="goodsDesc.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodsDesc: {}
    }
  },
  created() {
    this.getGoodsDesc()
  },
  methods: {
    getGoodsDesc() { // 获取商品图文介绍数据
      this.$http.get('api/goods/getdesc/' + this.id).then(result => {
        if(result.body.status === 0) {
          this.goodsDesc = result.body.message[0]
          // Toast('获取商品图文介绍成功！')
        } else {
          Toast('获取商品图文介绍失败！')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.goods-desc {
  padding: 4px;
  
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }

  .gd-content {
    img {
      width: 100%;
    }
  }
}
</style>