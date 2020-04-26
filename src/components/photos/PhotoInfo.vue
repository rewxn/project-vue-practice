<template>
  <div class="ptinfo">
    <h3 class="ptinfo-title">{{ photoInfo.title }}</h3>
    <p class="ptinfo-subtitle">
      <span>发表时间：{{ photoInfo.add_time | dateFormat }}</span>
      <span>点击：{{ photoInfo.click }}次</span>
    </p>
    <hr>
    
    <!-- 缩略图 -->
    <!-- img 上的 class 不能去掉 -->
    <div class="ptinfo-thumbs">
      <vue-preview :slides="thumbsList" @close="handleClose"></vue-preview>
    </div>

    <!-- 图片详情 -->
    <div class="ptinfo-content" v-html="photoInfo.content"></div>

    <!-- 评论区子组件 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import comment from "../subcomponents/Comment.vue"

export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: {},
      thumbsList: []
    }
  },
  created() {
    this.getPhotoInfo()
    this.getThumbsList()
  },
  methods: {
    getPhotoInfo() { // 获取图片详情数据
      this.$http.get('api/getimageInfo/' + this.id).then(result => {
        if(result.body.status === 0) {
          this.photoInfo = result.body.message[0]
          // Toast('获取图片详情成功！')
        } else {
          Toast('获取图片详情失败！')
        }
      })
    },
    getThumbsList() { // 获取缩略图数据
      this.$http.get('api/getthumimages/' + this.id).then(result => {
        if(result.body.status === 0) {
          this.thumbsList = result.body.message
          this.thumbsList.forEach(item => { // 补全图片的宽和高
            item.w = 600
            item.h = 600
            item.msrc = item.src
          })
          // Toast('获取缩略图成功！')
        } else {
          Toast('获取缩略图失败！')
        }
      })
    },
    handleClose () {
        console.log('close event')
      }
  },
  components: {
    "comment-box": comment
  }
}
</script>

<style lang="scss" scope>
.ptinfo {
  padding: 3px;

  .ptinfo-title {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }

  .ptinfo-subtitle {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
  }

  .ptinfo-thumbs {
    figure {
      margin: 10px;
      box-shadow: 0 0 8px #999;
      height: 100px;
      width: 100px;
      display: inline-block;
      overflow: hidden;
      margin: 10px;

      img {
        height: 100%;
        width: 100%;
      }
    }
  }

  .ptinfo-content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>