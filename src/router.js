import VueRouter from "vue-router";
// 导入对应的路由组件
import HomeContainer from "./components/tabbar/HomeContainer.vue";
import MemberContainer from "./components/tabbar/MemberContainer.vue";
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue";
import SerachContainer from "./components/tabbar/SerachContainer.vue";
import NewsList from "./components/news/NewsList.vue";
import NewsInfo from "./components/news/NewsInfo.vue";
import PhotosList from "./components/photos/PhotosList.vue";
import PhotoInfo from "./components/photos/PhotoInfo.vue";
import CommodityList from "./components/commodity/commodityList.vue";
import CommodityInfo from "./components/commodity/commodityInfo.vue";
// 创建路由对象
var router = new VueRouter({
    routes:[
        // 配置路由规则
        { path: "/", redirect: "/home" },
        { path: "/home", component: HomeContainer },
        { path: "/member", component: MemberContainer },
        { path: "/shopcar", component: ShopcarContainer},
        { path: "/search", component: SerachContainer },
        { path: "/home/newList", component: NewsList },
        { path: "/home/newsInfo/:id", component: NewsInfo },
        { path: "/home/photoList", component: PhotosList },
        { path: "/home/photoInfo/:id", component: PhotoInfo },
        { path: "/home/commodityList", component: CommodityList },
        { path: "/home/commodityList/commodityInfo/:id", component: CommodityInfo }
    ],
    linkActiveClass: "mui-active" // 默认的类 router-link-active
});
// 把路由对象暴露出去
export default router;