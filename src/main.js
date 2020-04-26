// 入口文件
import Vue from 'vue'

// 导入路由的包
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)
// 导入 router.js
import router from './router.js'

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD hh:mm:ss") {
    return moment(dataStr).format(pattern)
})

// 导入 vue-resource
import VueResource from 'vue-resource'
// 安装 vue-resource
Vue.use(VueResource)
// 设置请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 设置 post 表单数据格式为 application/x-www-form-urlencoded
Vue.http.options.emulateJson = true

// 导入 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
var shopCar = JSON.parse(localStorage.getItem('shopCar') || '[]')
var store = new Vuex.Store({
    state: {
        shopCar: shopCar
    },
    mutations: {
        addToShopCar(state, goodsInfo) { // 点击加入购物车时调用此方法，将商品信息存入 store
            var inShopCar = false
            state.shopCar.some(item => {
                if(item.id == goodsInfo.id) {
                    item.count += parseInt(goodsInfo.count)
                    inShopCar = true
                    return true
                }
            })
            if(!inShopCar) {
                state.shopCar.push(goodsInfo)
            }
            localStorage.setItem('shopCar', JSON.stringify(state.shopCar))
        },
        updateToShopCar(state, goodsInfo) {
            state.shopCar.some(item => {
                if(item.id == goodsInfo.id) {
                    item.count = parseInt(goodsInfo.count)
                }
            })
            localStorage.setItem('shopCar', JSON.stringify(state.shopCar))
        },
        deleteGoods(state, id) {
            state.shopCar.some((item, i) => {
                if(item.id == id) {
                    state.shopCar.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem('shopCar', JSON.stringify(state.shopCar))
        },
        goodsSelectChanged(state, selectInfo) {
            state.shopCar.some(item => {
                if(item.id == selectInfo.id) {
                    item.isSelected = selectInfo.isSelected
                }
            })
            localStorage.setItem('shopCar', JSON.stringify(state.shopCar))
        }
    },
    getters: {
        getAllCount(state) {
            var c = 0
            state.shopCar.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var gc = {}
            state.shopCar.forEach(item => {
                gc[item.id] = item.count
            })
            return gc
        },
        getGoodsSelect(state) {
            var gs = {}
            state.shopCar.forEach(item => {
                gs[item.id] = item.isSelected
            })
            return gs
        },
        getComputeNumber(state) {
            var cn = { count: 0, sum: 0 }
            state.shopCar.forEach(item => {
                if(item.isSelected) {
                    cn.count += item.count
                    cn.sum += (item.price * item.count)
                }
            })
            return cn
        }
    }
})

// 导入 MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

/*
// 按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// 页面头部
Vue.component(Header.name, Header)
// 首页轮播图
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
// 按钮
Vue.component(Button.name, Button)
// 懒加载
Vue.use(Lazyload)
*/
// 导入 Mint-UI 组件
import mint from 'mint-ui'
Vue.use(mint)

// 导入 图片预览 插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入 App 组件
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router, // 挂载路由对象
    store
})
