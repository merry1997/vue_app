// 入口
import Vue from "vue";
// 导入 router 并安装
import VueRouter from "vue-router"
Vue.use(VueRouter);
// 定义全局过滤器
// 导入格式化时间插件
import moment from "moment";
Vue.filter("dateFormat", function(dataStr, pattern = "YYYY-MM-DD HH:mm"){
    // 使用 moment 格式化
    return moment(dataStr).format(pattern);
});
// 导入 vue-resoures 组件
import VueResource from "vue-resource";
Vue.use(VueResource);
// 设置请求的根路径
Vue.http.options.root = "http://127.0.0.1:1338/";
// 全局定义 表单数据提交类型
Vue.http.options.emulateJSON = true;
// 按需导入 MintUI 组件
//import { Header, Swipe, SwipeItem, Button, Lazyload } from "mint-ui";
// 使用 MintUI 组件
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

// 注意：使用 Lazyload 懒加载组件时，无法使用按需导入，需要全局导入
import MintUI from "mint-ui";
Vue.use(MintUI);

// 安装图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

// 导入 mui 样式表
import "./lib/mui/css/mui.min.css";
import "./lib/mui/css/icons-extra.css";
// 导入 MintUI 组件样式表
import "mint-ui/lib/style.min.css";
// 导入自己的 router.js 模块
import router from "./router";

// 导入 app 组件
import app from "./App.vue";

var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router // 挂载路由对象到实例上
});