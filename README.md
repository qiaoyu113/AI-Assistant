# AI-Assistant

该文件为“AI-Assistant”

## 项目架构版本
| C++ | Python |
| ------ | ------ |
| v2.6.10 | v2.5.5 |

| Author | E-mail |
| ------ | ------ |
| 乔宇 | 527324363@qq.com |

# 安装依赖

1. 安装flask
```
pip3 install flask 
```

# 启动服务
python app.py

```

## 目录

```bash
├── public                     // 构建相关
├── mock                       // 本地mock数据
│   ├── role                   // mock权限相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 静态资源
│   ├── components             // 全局公用组件
│   ├── filters                // 全局 filter
│   ├── icons                  // 项目所有 svg icons
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── views                  // views 所有页面
│   |   ├── 404                // 404页面
│   |   ├── home               // APP主框架
│   |   ├── views              // view文件夹
│   |   |   ├── clue           // 线索相关
│   |   |   ├── driver         // 司机相关
│   |   |   ├── line           // 线路相关
│   |   |   ├── order          // 订单相关
│   |   |   ├── other          // 附加相关
│   |   |   ├── setting        // 个人中心设置相关
│   |   |   └── user           // 个人中心相关
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口文件 加载组件 初始化等
│   └── settings.js            // 公共设置项
├── .eslintrc.js               // eslint 配置项
├── .gitignore                 // git 忽略项
├── index.html                 // html模板
└── package.json               // package.json
```
