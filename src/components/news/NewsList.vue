<template>
  <div>
    <ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
				<router-link :to="'/home/newsinfo/' + item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<h3>{{ item.title }}</h3>
						<p class='mui-ellipsis'>
              <span>发表时间：{{ item.add_time | dateFormat }}</span>
              <span>点击：{{ item.click }}次</span>
            </p>
					</div>
				</router-link>
			</li>
		</ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      newsList: [] // 保存图文资讯的数组
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    getNewsList() { // 获取图文资讯数据
      this.$http.get('api/getnewslist').then(result => {
        if(result.body.status === 0) {
          this.newsList = result.body.message
          // Toast('获取图文资讯成功！')
        } else {
          Toast('获取图文资讯失败！')
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
.mui-table-view {
  li {
    h3 {
      font-size: 14px;
    }

    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>