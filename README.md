# 这个是demo

## 有灵魂的demo

### 富有诗意的demo

#### 呀哈哈哈

##### 开源协议区别：https://blog.csdn.net/leos_blog/article/details/44774541

## 命令方式把修改的代码上传到码云
1. git add .
2. git commit -m "提交信息"
3. git push

## 制作首页app组件
1. 完成 header 区域，使用的是 mint-ui 中的 header 组件
2. 制作底部的 tabbar 区域，使用的是 mui 的 tabbar.html
+ 在制作购物车小图标时，先把扩展图标包拷贝到项目中去 
+ 拷贝扩展字库的 ttf 文件到项目中去
+ 为购物车小图标，添加如下类 mui-icon-extra mui-icon-extra-cart
3. 要在中间区域放置一个 router-view ，展示要显示的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播布局（mint-ui）

## 加载首页轮播数据
1. 获取数据，使用 vue-resourece
2. 使用 vue-resourece 的 this.$http.get
3. 获取到的数据，要保存在 data 身上
4. 使用 v-for 循环渲染 每个 item 项

## 改造九宫格区域的样式

## 改造 新闻资讯 的链接

## 新闻资讯 页面 
1. 绘制界面，使用 mui 中的 me
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link ，同时，在跳转时提供唯一的id标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在 路由模块中，将新闻详情的路由地址和组件页面对应起来

## 实现 新闻详情 的页面布局 和 数据渲染
1. 先创建一个单独的 comment.vue 组件模版
2. 在需要使用 comment 组件的 页面中，先导入 comment 组件
    + import comment from "/comment.vue"
3. 在父组件中，使用 components 属性，将刚才导入 compent 组件，注册为自己的 子组件
4. 将注册子组件时候的注册名称，已标签形式，在页面中引入

## 获取所有的评论数据，显示到页面中

## 实现点击加载更多评论功能
1. 为加载更多按钮添加点击事件,获取最新的评论

## 改造图片分享 按钮为路由的链接，并显示相应的组件

## 绘制图片列表组件的结构并美化样式
1. 顶部的滑动条
2. 底部图片列表

## 制作顶部滑动条：
1. 借助与 mui 的 tab-top-webview-main.html
2. 需要删除 mui-fullscreen 类名
3. 滑动条无法触发滑动事件，这是js组件，需要初始化
+ 导入 mui.js
+ 调用官方提供的 方式 去初始化
+ mui('.mui-scroll-wrapper').scroll({
    scrollY: false,
    scrollX: true,
    deceleration: 0.0006,
    bounce: true
});
4. 发现在初始化滑动条的时候，导入mui.js，但是控制台报错：***
+ 经过推测，可能是mui.js中用到了这些个报错的东西，在 webpack 严格模式中无法使用
+ 解决方案：1. 把 mui.js 中的非严格模式的代码改掉（不现实）
        2. 禁用 webpack 严格模式
5. 刚进入图片分享的时候，滑动条无法正常工作，分析发现，要初始化，滑动条必须等dom元素加载完毕，所以，我们把初始化滑动条代码，搬到了 mounted 生命周期中
6. 当滑动条调试 ok 时，tabbar 无法正常工作了，我们要把每个tabbar按钮的 mui-tab-item 重新改一下名字
7. 获取所有分类，并渲染所有分类列表

### 制作图片列表区域
1. 图片列表使用懒加载，这里使用mint-ui提供的组件 ‘lazy-load’
2. 根据 ‘lazy-load’ 的使用文档，尝试使用
3. 渲染我们的图片列表数据

### 实现了图片列表的懒加载改造和样式美化

## 实现了 点击图片 跳转到 图片详情的路由改造
1. 在改造li成router-link的时候，需要使用tag标签属性指定为要渲染哪种元素

## 实现详情页面的布局和美化，同时获取数据渲染页面
1. 使用插件 vue-preview 这个略缩图插件
2. 获取所有的图片列表
3. 每个图片数据对象中，必须要 w 和 h 属性

## 绘制商品页面基本结构