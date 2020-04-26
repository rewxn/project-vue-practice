<template>
  <div class="app-container">
    <!-- header --- 使用 Mint-UI 中的 Header 组件 -->
    <mt-header fixed title="Vue练习小项目">
			<span slot="left" @click="goBack" v-show="backDisplay">
    		<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>

    <!-- router-view -->
		<transition>
			<router-view></router-view>
		</transition>

    <!-- Tabbar --- 使用 MUI 中的 Tabbar.html -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-footer" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-footer" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-footer" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-footer" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
	data() {
		return {
			backDisplay: false
		}
	},
	created() {
		this.backDisplay = this.$route.path === "/home" ? false : true
	},
	methods: {
		goBack() {
			this.$router.go(-1)
		}
	},
	watch: {
		"$route.path": function(newVal) {
			if(newVal === "/home") {
				this.backDisplay = false
			} else {
				this.backDisplay = true
			}
		}
	}
}
</script>


<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
	padding-bottom: 50px;
	overflow-x: hidden;
}

.mint-header {
	z-index: 666;
}

.v-enter {
	opacity: 0;
	transform: translateX(100%);
}
.v-leave-to {
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}

.v-enter-active,
.v-leave-active {
	transition: all 0.2s ease;
}

// 修改每个tabber按钮的类名，并重写样式
// 解决加入滑动条之后，tabbar按钮不能切换组件的问题
.mui-bar-tab .mui-tab-item-footer.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-footer {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-footer .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-footer .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
