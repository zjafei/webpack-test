const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');

const paths = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

module.exports = {
    entry: {//入口
        app: paths.app,//入口路径
    },
    output: {//输出
        path: paths.build,//输出地址
        filename: '[name]-[hash].js',//输出名字 name 当前文件名 hash hash值
    },
    devServer: {
        port: '8090',
        host: '192.168.56.20',
        overlay: {//浏览器中显示错误信息
            warnings: true,
            errors: true
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        emitWarning: true,
                    },
                }],
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                use: extractTextWebpackPlugin.extract({
                    use: {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            camelCase: true,
                            /**
                             root: ‘/‘, //修改css中url指向的根目录, 默认值为/, 对于绝对路径, css-loader默认是不会对它进行处理的
                             modules: false, //开启css-modules模式, 默认值为flase
                             localIdentName: ‘[name]-[local]-[hash:base64:5]‘, //设置css-modules模式下local类名的命名
                             minimize: false, //压缩css代码, 默认false
                             camelCase: false, //导出以驼峰化命名的类名, 默认false
                             import: true, //禁止或启用@import, 默认true
                             url: true, //禁止或启用url, 默认true
                             sourceMap: false, //禁止或启用sourceMap, 默认false
                             importLoaders: 0, //在css-loader前应用的loader的数目, 默认为0
                             alias: {} //起别名, 默认{}
                             */
                        }
                    },
                    fallback: 'style-loader',
                }),
            },
        ],
    },
    plugins: [//插件
        new htmlWebpackPlugin({
            title: 'app 004',
            //template:paths.app + '/template.html',
            inject: 'body'
            /**
             title: 用来生成页面的 title 元素
             filename: 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
             template: 模板文件路径，支持加载器，比如 html!./index.html
             inject: true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
             favicon: 添加特定的 favicon 路径到输出的 HTML 文件中。
             minify: {} | false , 传递 html-minifier 选项给 minify 输出
             hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
             cache: true | false，如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件。
             showErrors: true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
             chunks: 允许只添加某些块 (比如，仅仅 unit test 块)
             chunksSortMode: 允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'
             excludeChunks: 允许跳过某些块，(比如，跳过单元测试的块)
             **/
        }),
        new extractTextWebpackPlugin({
            filename: '[name]-[hash].css',
            ignoreOrder: true,
        }),
    ]
};
