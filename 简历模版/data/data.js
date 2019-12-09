const DATA = {
    // 开头介绍环节,数组中的每一个元素为一段
    introduce: [
        // '这是 ZCreturn0 开发的的一款简历模版,灵感来自知乎的某篇文章.本项目地址: https://github.com/ZCreturn0/thoughts/tree/master/%E7%AE%80%E5%8E%86%E6%A8%A1%E7%89%88. 觉得不错请点个 ★star !!',
        // '改变本文件内容换成你想展示的内容,introduce 中每个元素为一段.',
        // '当 introduce 完后会进入编写代码展示简历环节.',
        // '可根据需求更改代码,该有注释的地方都写了注释.',
        // '因为用的是<pre></pre>标签,所以这里输入文字的时候不要随便加换行.',
        '下面进入代码展示区.'
    ],
    // 对代码进行解释及对应的代码
    code: {
        // 步骤
        '0': {
            // 描述,每项为一段
            description: [
                '首先建立一个 HTML 模版.'
            ],
            // 对应的代码
            code: {
                html: [
                    {
                        // 是否要插入代码
                        insert: false,
                        // 要显示的代码
                        // 用 \n 表示换行
                        code: `<!DOCTYPE html>\n<html lang="zh">\n<head>`,
                        // 缩进
                        indent: 0
                    },
                    {
                        insert: false,
                        code: `<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta http-equiv="X-UA-Compatible" content="ie=edge">`,
                        indent: 4
                    },
                    {
                        insert: false,
                        code: '<title>我的简历</title>\n<link rel="stylesheet" type="text/css" href="./index.css" />',
                        indent: 4
                    },
                    {
                        insert: false,
                        code: '</head>\n<body>',
                        indent: 0
                    },
                    {
                        insert: false,
                        code: '<div class="display-container">',
                        indent: 4
                    },
                    {
                        insert: true,
                        code: '',
                        // 对应的步骤代码
                        content: '2',
                        indent: 8
                    },
                    {
                        insert: false,
                        code: '</div>',
                        indent: 4
                    },
                    {
                        insert: false,
                        code: '</body>\n</html>',
                        indent: 0
                    }
                ],
                css: []
            }
        },
        '1': {
            description: [
                '接下来添加一些初始化 CSS,并设置两个全局颜色.'
            ],
            code: {
                html: [],
                css: [
                    {
                        code: `* {`,
                        indent: 0
                    },
                    {
                        code: `padding: 0;\nmargin: 0;`,
                        indent: 4
                    },
                    {
                        code: `}`,
                        indent: 0
                    },
                    {
                        code:`html,\nbody {`,
                        indent: 0
                    },
                    {
                        code: `width: 100%;\nheight: 100%;\nbackground: #000;`,
                        indent: 4
                    },
                    {
                        code: `}`,
                        indent: 0
                    },
                    {
                        code: `/* 全局变量 */\n:root {`,
                        indent: 0
                    },
                    {
                        code: `/* 个人信息背景色 */\n--info-bgColor: #00968f;\n/* 详细信息背景色 */\n--detail-bgColor: #fff;`,
                        indent: 4
                    },
                    {
                        code: `}`,
                        indent: 0
                    },
                    {
                        code: `.display-container {`,
                        indent: 0
                    },
                    {
                        code: `width: 640px;\nheight: 700px;\nmargin: 0 auto;\nbox-shadow: 0 0 10px 10px #ccc inset;`,
                        indent: 4
                    },
                    {
                        code: `display: flex;\n-webkit-box-reflect: below 10px -webkit-linear-gradient(bottom, rgba(255, 255, 255, 0.3) 0%, \ntransparent 40%, transparent 100%);`,
                        indent: 4
                    },
                    {
                        code: `}`,
                        indent: 0
                    }
                ]
            }
        },
        '2': {
            description: [
                '整个页面分为两部分.',
                '一部分是个人信息,一部分是详情信息.'
            ],
            code: {
                html: [
                    {
                        insert: false,
                        code: '<!-- 个人信息 -->',
                        indent: 8
                    },
                    {
                        insert: false,
                        code: '<div class="info">',
                        indent: 8
                    },
                    {
                        insert: true,
                        code: '',
                        content: '3',
                        indent: 12
                    },
                    {
                        insert: true,
                        code: '',
                        content: '4',
                        indent: 12
                    },
                    {
                        insert: true,
                        code: '',
                        content: '5',
                        indent: 12
                    },
                    {
                        insert: false,
                        code: '</div>',
                        indent: 8
                    },
                    {
                        insert: false,
                        code: '<!-- 详细信息 -->',
                        indent: 8
                    },
                    {
                        insert: false,
                        code: '<div class="detail">',
                        indent: 8
                    },
                    {
                        insert: true,
                        code: '',
                        // 对应的步骤代码
                        content: '00000000000000',
                        indent: 12
                    },
                    {
                        insert: false,
                        code: '</div>',
                        indent: 8
                    },
                ],
                css: [
                    {
                        code: `.display-container .info {`,
                        indent: 0
                    },
                    {
                        code: `width: 30%;\nheight: 100%;\nbackground: var(--info-bgColor);\ncolor: #fff;`,
                        indent: 4
                    },
                    {
                        code: `}`,
                        indent: 0
                    },
                    {
                        code: `.display-container .detail {`,
                        indent: 0
                    },
                    {
                        code: `width: 70%;\nheight: 100%;\nbackground: var(--detail-bgColor);`,
                        indent: 4
                    },
                    {
                        code: `}`,
                        indent: 0
                    },
                ]
            }
        },
        '3': {
            description: [
                '先放上自己的照片,并设置相应的样式.'
            ],
            code: {
                html: [
                    {
                        insert: false,
                        code: '<div class="avatar"></div>',
                        indent: 12
                    }
                ],
                css: [
                    {
                        code: `.display-container .avatar {`,
                        indent: 0
                    },
                    {
                        code: `width: 150px;\nheight: 150px;\nbackground: url('./avatar.jpg');\nbackground-size: contain;\nmargin: 20px auto 20px;\nborder-radius: 50%;`,
                        indent: 4
                    },
                    {
                        code: `.}`,
                        indent: 0
                    },
                ]
            }
        },
        '4': {
            description: [
                '添加个人信息,增加相应的样式.'
            ],
            code: {
                html: [
                    {
                        insert: false,
                        code: '<div class="info-block">',
                        indent: 8
                    },
                    {
                        insert: false,
                        code: '<div class="block-title">个人信息</div>',
                        indent: 12
                    },
                    {
                        insert: false,
                        code: '<ul class="block-info-list">',
                        indent: 12
                    },
                    {
                        insert: false,
                        code: '<li>📱  13222222222</li>',
                        indent: 16
                    },
                    {
                        insert: false,
                        code: '<li>📪 aaaaaaa@qq.com</li>',
                        indent: 16
                    },
                    {
                        insert: false,
                        code: '</ul>',
                        indent: 12
                    },
                    {
                        insert: false,
                        code: '</div>',
                        indent: 8
                    }
                ],
                css: [
                    {
                        code: `.display-container .info-block {`,
                        indent: 0
                    },
                    {
                        code: `padding: 10px 15px;`,
                        indent: 4
                    },
                    {
                        code: `}`,
                        indent: 0
                    },
                    {
                        code: `.display-container .block-title {`,
                        indent: 0
                    },
                    {
                        code: `font-size: 20px;\nfont-weight: bold;\npadding: 10px 0;`,
                        indent: 4
                    },
                    {
                        code: `}`,
                        indent: 0
                    },
                    {
                        code: `.display-container .block-info-list {`,
                        indent: 0
                    },
                    {
                        code: `list-style: none;`,
                        indent: 4
                    },
                    {
                        code: `}`,
                        indent: 0
                    },
                    {
                        code: `.display-container .block-info-list > li {`,
                        indent: 0
                    },
                    {
                        code: `padding-bottom: 10px;`,
                        indent: 4
                    },
                    {
                        code: `}`,
                        indent: 0
                    }
                ]
            }
        },
        '5': {
            description: [
                '类似地添加其他信息.',
                '因为所用的类都是一样的,所以不需要额外添加 CSS.'
            ],
            code: {
                html: [
                    {
                        insert: false,
                        code: '<div class="info-block">',
                        indent: 8
                    },
                    {
                        insert: false,
                        code: '<div class="block-title">技能证书</div>',
                        indent: 12
                    },
                    {
                        insert: false,
                        code: '<ul class="block-info-list">',
                        indent: 12
                    },
                    {
                        insert: false,
                        code: '<li>很值钱的证书1</li>',
                        indent: 16
                    },
                    {
                        insert: false,
                        code: '<li>很值钱的证书2</li>',
                        indent: 16
                    },
                    {
                        insert: false,
                        code: '<li>没那么值钱的证书3</li>',
                        indent: 16
                    },
                    {
                        insert: false,
                        code: '<li>不值钱的就别写了</li>',
                        indent: 16
                    },
                    {
                        insert: false,
                        code: '</ul>',
                        indent: 12
                    },
                    {
                        insert: false,
                        code: '</div>',
                        indent: 8
                    },
                    {
                        insert: false,
                        code: '<div class="info-block">',
                        indent: 8
                    },
                    {
                        insert: false,
                        code: '<div class="block-title">获得奖项</div>',
                        indent: 12
                    },
                    {
                        insert: false,
                        code: '<ul class="block-info-list">',
                        indent: 12
                    },
                    {
                        insert: false,
                        code: '<li>再来一瓶</li>',
                        indent: 16
                    },
                    {
                        insert: false,
                        code: '<li>再来一包</li>',
                        indent: 16
                    },
                    {
                        insert: false,
                        code: '<li>冠军之夜抽中价值10块的皮肤</li>',
                        indent: 16
                    },
                    {
                        insert: false,
                        code: '</ul>',
                        indent: 12
                    },
                    {
                        insert: false,
                        code: '</div>',
                        indent: 8
                    }
                ],
                css: []
            }
        },
        length: 6
    }
};