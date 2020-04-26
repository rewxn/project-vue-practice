<template>
  <div>
    <!-- 顶部滑动条 -->
    <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in slider" :key="item.id" @click="getPhotosList(item.id)">
						{{ item.title }}
					</a>
				</div>
			</div>
		</div>

    <!-- 图片列表 -->
    <ul class="photos-list">
      <router-link tag="li" v-for="item in photosList" :key="item.id" :to="'/home/photoinfo/' + item.id">
        <img v-lazy="item.img_url">
        <div class="img-info">
          <h1 class="img-info-title">{{ item.title }}</h1>
          <div class="img-info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
  data() {
    return {
      slider: [],
      photosList: []
    }
  },
  created() {
    this.getslider()
    this.getPhotosList(0)
  },
  mounted() {
    // 初始化滑动控件
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005
    })
  },
  methods: {
    getslider() { // 获取滑动条数据
      this.$http.get('api/getimgcategory').then(result => {
        if(result.body.status === 0) {
          this.slider = result.body.message
          this.slider.unshift({ title: "全部", id: 0 });
          // Toast('获取滑动条成功！')
        } else {
          Toast('获取滑动条失败！')
        }
      })
    },
    getPhotosList(photosListId) { // 获取图片列表数据
      this.$http.get('api/getimages/' + photosListId).then(result => {
        if(result.body.status === 0) {
          this.photosList = result.body.message
          // Toast('获取图片列表成功！')
        } else {
          Toast('获取图片列表失败！')
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
* { // 消除滑动的时候浏览器的警告
  touch-action: pan-y;
}

.photos-list {
  margin: 0;
  padding: 10px 10px 0;

  li {
    background-color: #ccc;
    list-style: none;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 6px #999;
    position: relative;

    img {
      width: 100%;
      vertical-align: middle;
    }

    img[lazy=loading] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .img-info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;

      .img-info-title {
        font-size: 14px;
      }

      .img-info-body {
        font-size: 13px;
      }
    }
  }
}
</style>