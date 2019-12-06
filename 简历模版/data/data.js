const DATA = {
    // 开头介绍环节,数组中的每一个元素为一段
    introduce: [
        '这是 ZCreturn0 开发的的一款简历模版,灵感来自知乎的某篇文章.本项目地址: https://github.com/ZCreturn0/thoughts/tree/master/%E7%AE%80%E5%8E%86%E6%A8%A1%E7%89%88. 觉得不错请点个 ★star !!',
        '改变本文件内容换成你想展示的内容,introduce 中每个元素为一段.',
        '当 introduce 完后会进入编写代码展示简历环节.',
        '可根据需求更改代码,该有注释的地方都写了注释.',
        '因为用的是<pre></pre>标签,所以这里输入文字的时候不要随便加换行.',
        '下面进入代码展示区.'
    ],
    // 对代码进行解释及对应的代码
    code: {
        // 步骤
        '0': {
            // 描述,每项为一段
            description: [
                '首先建立一个 HTML 模版'
            ],
            // 对应的代码
            code: {
                html: [
                    {
                        // 是否要插入代码
                        insert: false,
                        // 要显示的代码
                        code: '<!DOCTYPE html>',
                        // 缩进
                        indent: 0
                    },
                    {
                        insert: false,
                        code: '<html lang="zh">',
                        indent: 0
                    },
                    {
                        insert: false,
                        code: '<head>',
                        indent: 0
                    },
                    {
                        insert: false,
                        code: '<meta charset="UTF-8">',
                        indent: 4
                    },
                    {
                        insert: false,
                        code: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                        indent: 4
                    },
                    {
                        insert: false,
                        code: '<meta http-equiv="X-UA-Compatible" content="ie=edge">',
                        indent: 4
                    },
                    {
                        insert: false,
                        code: '<title>我的简历</title>',
                        indent: 4
                    },
                    {
                        insert: false,
                        code: '<link rel="stylesheet" type="text/css" href="./index.css" />',
                        indent: 4
                    },
                    {
                        insert: false,
                        code: '</head>',
                        indent: 0
                    },
                    {
                        insert: false,
                        code: '<body>',
                        indent: 0
                    },
                    {
                        insert: true,
                        code: '',
                        // 对应的步骤代码
                        content: '1',
                        indent: 4
                    },
                    {
                        insert: false,
                        code: '</body>',
                        indent: 0
                    },
                    {
                        insert: false,
                        code: '</html>',
                        indent: 0
                    },
                ],
                css: []
            }
        }
    }
};