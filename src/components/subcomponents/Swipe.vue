<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 轮播图使用 v-for 循环渲染 -->
      <mt-swipe-item v-for="item in swipeImg" :key="item.id">
        <img :src="item.img" :class="{'full-width': isFullWidth}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ["swipeImg", "isFullWidth"]
}
</script>

<style lang="scss" scope>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    text-align: center;
    
    img {
      height: 100%;
    }
  }
}

.full-width {
  width: 100%;
}
</style>