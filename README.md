# antd-ts-demo
antd typeScript最佳开发实践

> dva说明
```
本例程基于我自己改良以后的dvajs
链接地址:https://github.com/fangkyi03/dvajs
在原有的dva基础上进行了功能的增加 具体可以看说明
当然因为是完美兼容原有的dva 所以 如果你用不惯的话 
依旧可以正常使用原有的写法来开发 不会有任何影响

> 区别1
// 转换model函数m
const tranModel = (model = []) => {
  return model.map(e => {
    return new Promise((resolve, reject) => {
      resolve({
        namespace: e,
        state: {
          isShow: true
        },
        reducers: {},
        effect: {},
        subscriptions: {}
      });
    });
  });
};

export const routes = [
  {
    name: "首页",
    path: "/home",
    component: () => import("../routes/Home/index.tsx"),
    models: [AllModel.Home]
  }
];

export enum AllModel {
  Home = "Home"
}

原来的话 你每次创建一个model都需要创建一个文件出来才可以
太过麻烦 而且也很繁琐 现在要实现按需加载的话
只需要在这里将你想要的modelName输入进去即可 就会帮你按需加载对应的model
这样的好处就是 你现在在connect 或者this.props.dispatch的时候 
都可以直接用这个定义好的AllModel来直接导入 也不用像原来那样 因为找个名字而切来切去了
```
> formEvent部分
```
这个项目将表单的行为分成了3种

1.如果返回数组类型 将会调用dvajs的网络请求 帮你进行执行
并且会帮你自动刷新对应的model 多条网络请求会合并统一刷新
具体可以看dvajs的说明
[
    {
        type:'FormInput',
        onClick:()=>[
            {
                url:'xxxx',
                params:{xxx}
            }
        ],
    }
]

2.如果返回的是一个对象 那么就会自动帮你刷新对应的表单组件
如现在表单里面有个key值叫button的组件存在的话 你返回的数据
就会自动帮你更新到对应的组件上去
    onClick:()=>({button:1}),

3.如果你没有返回任何东西 不做任何处理 所以你可以在这里写你的函数调用
    onClick:()=>this.props.dispatch(routerRedux.push({pathname:'xxx'}))

```

> css样式部分
```
虽然这个项目是兼容css sass scss less的 但是目前只对scss有做支持
其他的几种在tsx中无法直接使用
import * styles form 'xxx'
这种方式导入来使用
个人也比较推荐直接使用scss 
当然 如果你不在乎局部样式隔离这种问题的话
可以直接这样
require('xxx')
来引入 不过这样引入的样式是全局的
```

> 目录结构
```
./src
├── common
│   ├── converData.ts 数据转换 如网络请求的数据不符合你要求 想要进行转换的话 可以写在这里
│   ├── menu.js       左侧菜单
│   ├── netTool.js    网络请求 如GET POST等 想要进行的网络请求类型都可以在这里编写
│   └── router.js     页面路由
├── components
│   ├── SilderMenu            根据上面的menu数据生成对应的菜单
│   │   ├── index.js    
│   │   ├── index.less
│   │   ├── index.less.d.ts
│   │   └── renderMenu.js
│   └── header                最顶上的头部条
│       ├── header.js
│       ├── header.less
│       └── header.less.d.ts
├── config                    这个目录用来放项目里面可以被公用的props配置数据如history dispatch
├── index.js
├── index.less
├── index.less.d.ts
├── layout                    等同于项目的模板文件 可以存放多个模板页面
│   ├── BaseLayout.js
│   ├── BaseLayout.less
│   └── BaseLayout.less.d.ts
├── models                    
│   ├── fetch.js              网络处理的核心 没有跟dva打包在一起是因为可以方便调试 不然转成es5调试会很麻烦
│   └── index.ts              这里就是定义所有modelName的地方
├── router.js
└── routes                    这里写页面布局
    └── Home
        ├── index.scss     
        ├── index.scss.d.ts
        └── index.tsx
```