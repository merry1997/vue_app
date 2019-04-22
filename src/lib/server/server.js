const http = require('http');
const url = require('url');
const queryString = require("querystring");
const mysql = require("mysql");

const hostname = '127.0.0.1';
const port = 1338;

http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });
    var pool = mysql.createPool({ //链接池配置
        host: "localhost", //主机地址 IP地址 本机地址 -h
        port: 3306, //端口号默认是3306，如果改了就写改后的端口
        user: "root", //账号名 用户名
        password: "54guoshuai", //密码 如果没有就不写
        database: "vue_app" //操作的数据库
    });

    function getConn(sqlStr) {
        var promise = new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("获取失败");
                } else {
                    connection.query(sqlStr.cmd, (err, result) => {
                        if (err) {
                            console.log("操作失败：" + err.sqlMessage);
                        } else {
                            resolve(result);
                        };
                        connection.release();
                    });
                };
            });
        });
        return promise;
    };
    //req.url 请求的URL
    let methods = req.method;
    // console.log("当前的访问方式是:" + methods);
    if (methods == "GET") {
        let params = url.parse(req.url, true, true);
        // url对象
        console.log(params);
        switch (url.parse(req.url).pathname) {
            case "/swiperImg": // 返回轮播图
                getConn({
                    cmd: "select * from swiperImg"
                }).then(data => {
                    res.end(JSON.stringify(data));
                });
                break;
            case "/newsListData": // 返回新闻列表
                getConn({
                    cmd: "select * from newsListData"
                }).then(data => {
                    res.end(JSON.stringify(data));
                });
                break;
            case "/getNewsInfo": // 返回指定id的新闻详情
                getConn({
                    cmd: "select * from newsInfo where id=" + params.query.id
                }).then(data => {
                    // 同时 click 点击次数要 + 1
                    let newsclick = data[0].click + 1;
                    getConn({
                        cmd: "update newsInfo set click='" + newsclick + "' where id=" + params.query.id
                    });
                    getConn({
                        cmd: "update newsListData set click='" + newsclick + "' where id=" + params.query.id
                    }).then(data => {
                        // 修改成功后，获取最新的点击数
                        getConn({
                            cmd: "select * from newsInfo where id=" + params.query.id
                        }).then(data => {
                            // 返回最新的数据
                            res.end(JSON.stringify(data));
                        });
                    });
                });
                break;
            case "/getComment": // 根据新闻页面的页码和id返回评论数据
                switch (params.query.parent) {
                    case "/home/newsInfo/:id": // 新闻页面评论
                        getConn({
                            cmd: "select * from NewsComment where id=" + params.query.id + " and floor < " + (params.query.pageIndex * 3 + 1)
                        }).then(data => {
                            if (params.query.pageIndex > Math.ceil(data.length / 3)) return res.end(JSON.stringify(params.query.pageIndex - 1));
                            res.end(JSON.stringify(data));
                        });
                        break;
                    case "/home/photoInfo/:id": // 图片详情页面评论
                        getConn({
                            cmd: "select * from photoComment where id=" + params.query.id + " and floor < " + (params.query.pageIndex * 3 + 1)
                        }).then(data => {
                            if (params.query.pageIndex > Math.ceil(data.length / 3)) return res.end(JSON.stringify(params.query.pageIndex - 1));
                            res.end(JSON.stringify(data));
                        });
                        break;
                    default:
                        break;
                };
                break;
            case "/AllCategory": // 获取图片分类
                getConn({
                    cmd: "select * from photoCates"
                }).then(data => {
                    res.end(JSON.stringify(data));
                });
                break;
            case "/PhotoListById": // 根据 id 返回对应的图组
                if (Boolean(Number(params.query.id))) return getConn({
                    cmd: "select * from photoList where photoGroup=" + params.query.id
                }).then(data => {
                    res.end(JSON.stringify(data));
                });
                getConn({
                    cmd: "select * from photoList"
                }).then(data => {
                    res.end(JSON.stringify(data));
                });
                break;
            case "/PhotoInfo": // 根据 id 返回对应的图片详情
                getConn({
                    cmd: "select * from PhotoInfo where id=" + params.query.id
                }).then(data => {
                    let newsclick = data[0].click + 1;
                    getConn({
                        cmd: "update PhotoInfo set click='" + newsclick + "' where id=" + params.query.id
                    }).then(data => {
                        getConn({
                            cmd: "select * from PhotoInfo where id=" + params.query.id
                        }).then(data => {
                            res.end(JSON.stringify(data));
                        });
                    });
                });
                break;
            case "/Thumbs":
                getConn({
                    cmd: "select * from photoThumbs where parent=" + params.query.id
                }).then(data => {
                    res.end(JSON.stringify(data));
                });
                break;
            case "/CommodityList":
                getConn({
                    cmd: "select * from commodityList where id< " + (params.query.page * 8 + 1)
                }).then(data => {
                    if (params.query.page > Math.ceil(data.length / 8)) return res.end(JSON.stringify("end"));
                    else res.end(JSON.stringify(data));
                });
                break;
            case "/CommodityInfo":
                getConn({
                    cmd: "select * from commodityInfo where id=" + params.query.id
                }).then(data => {
                    res.end(JSON.stringify(data[0]));
                });
                break;
            default:
                break;
        };
    } else {
        let datas = "";
        req.on("data", (chunk) => {
            datas += chunk;
        });
        req.on("end", () => {
            // 如果是ajax post请求这里换成JSON.parse
            let postData = queryString.parse(datas.toString());
            console.log(postData);
            switch (req.url) {
                case "/postAComment": // 发表评论
                    switch (postData.parent) {
                        case "/home/newsInfo/:id": // 新闻页面追加评论
                            postACom("NewsComment");
                            break;
                        case "/home/photoInfo/:id": // 图片详情页面追加评论
                            postACom("photoComment");
                            break;
                        default:
                            break;
                    };
                    function postACom(tabname){
                        getConn({
                            cmd: "select floor from " + tabname + " where id=" + postData.id
                        }).then(data => {
                            getConn({
                                cmd: "insert into " + tabname + "(id,floor,user,addTime,content) values('" + postData.id + "','" + (data.length + 1) + "','" + postData.user + "','" + new Date() + "','" + postData.content + "')"
                            });
                            res.end(JSON.stringify((data.length + 1)));
                        });
                    };
                    break;
                default:
                    break;
            };
        });
    };
}).listen(port, hostname, () => {
    console.log(`服务启动成功 http://${hostname}:${port}/`);
});