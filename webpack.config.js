const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname,'src'),
        host: 'localhost',
        port: 8090,
        hot: true
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'webpack-vue',
            filename: 'index.html',
            hash: true
        })
    ],
    resolve: {
        alias: { // 修改vue包配置文件中被导入时的路径
            "vue$": "vue/dist/vue.js"
        }
    },
    module:{
        rules:[
            { // 处理.vue文件的loader
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader','css-loader','sass-loader']
            },
            {
                test: /\.(gif|jpg|png)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:5000,
                        name: '[hash:8]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)$/,
                loader: 'url-loader'
            }
        ]
    }
};