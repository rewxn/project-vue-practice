<template>
  <div class="newsinfo">
    <h3 class="title">{{ newsInfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsInfo.click }}次</span>
    </p>
    <hr>
    <div class="content" v-html="newsInfo.content"></div>
    <!-- 评论区子组件 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import comment from '../subcomponents/Comment.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo: {}
    }
  },
  created() {
    this.getNewsInfo()
  },
  methods: {
    getNewsInfo() { // 获取图文详情数据
      this.$http.get('api/getnew/' + this.id).then(result => {
        if(result.body.status === 0) {
          this.newsInfo = result.body.message[0]
          // Toast('获取图文详情成功！')
        } else {
          Toast('获取图文详情失败！')
        }
      })
    }
  },
  components: {
    "comment-box": comment // 评论区子组件
  }
}
</script>

<style lang="scss">
.newsinfo {
  padding: 0 4px;

  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }

  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }

  .content {
    font-size: 14px;
  }
}
</style>