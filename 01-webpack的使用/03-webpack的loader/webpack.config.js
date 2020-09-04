const path = require('path')

module.exports = {
    entry: `./src/main.js`,
    output: {
        //需要动态获取路径,需要path模块
        path: path.resolve(__dirname, 'dist'),
        filename: `bundle.js`
    },
    module: {
        rules: [
            {
                test: /\.css$/, //cssLoader只负责加载，不负责解析
                //style-loader 负责将样式添加到DOM中，为何顺序反的呢？是因为webpack是从右向左读
                use: ['style-loader', 'css-loader' ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                rules: [
                    {
                        test: /\.(png|jpg|gif|jpeg)$/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    //当加载的图片，小于limit时，会将图片编译成base64字符串形式
                                    //如果大于这个limit，就需要file-loader来参与
                                    limit: 18000
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
}