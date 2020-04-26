<template>
  <div class="numbox">
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px;">
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" :value="goodscount" @change="countChanged" ref="numbox"/>
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
  mounted() {
    mui(".mui-numbox").numbox()
  },
  methods: {
    countChanged() {
      this.$store.commit("updateToShopCar", { id: this.goodsId, count: this.$refs.numbox.value})
    }
  },
  props: ["goodscount", "goodsId"]
}
</script>

<style lang="scss" scope>
.numbox {
  display: inline-block;
}
</style>