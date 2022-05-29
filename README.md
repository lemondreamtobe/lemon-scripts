# lemon-scripts

对于开发一个react项目来说，怎么快速搭建一个友好的，可靠的并且自带性能优化的环境，是非常繁琐的，不仅需要关注babel，还要学习各种各样的webpack配置，以及如何性能优化，这会花费大量的时间，可能忙活了半天，兴许会被各种各样的异常劝退。

对于这个问题，虽然业界巨头facebook给出了答案：create-react-app(简称CRA)，但是cra的开发环境非常简陋，虽然提供了诸多配置，但是还不够易用，如果用CRA来简单做一个demo，他非常胜任。但是如果用于生产，其实我们还需要加入很多东西，改很多webpack配置，比如初始化的cra项目不支持less，我们需要自己添加less-loader。

当我们遇到了需要加配置的情况，要么eject，这无疑是毁灭性的，冗长的配置加上莫名多了10几个文件的存在会让开发人员十分烦恼，要么就是使用cra-custom，但是这又引入了config.override这样的类配置文件，这不就离0配置的初心越来越远了。

这样的一切我们都忍了，但是一个生产项目迭代许久，面临精细化的拆包/cdn等等优化又无从做起。

基于此，lemon-scripts基于cra内置的react-scripts，做了以下扩展，lemon-scripts致力于将react-scripts完全推向生产，并且真正做到让react开发者开箱即用，并且提供尽可能极致的打包性能优化。

当然，在lemon-scripts， cra项目所有的配置和能力一如既往的支持并持续保持更新。

- [x] 原生支持less
- [x] 原生支持svg 2种引入方式 file url / Component (相比cra需要调整才能支持)
- [x] 原生支持多个react生态包的cdn打包，天然的纯净到bundle只有你的业务代码。
- [x] 原生支持移动端h5适配
- [x] 原生支持webpack analyze，随时掌握项目五脏六腑
- [x] 原生支持alias resolve，跟ts paths无缝结合
- [x] 同时支持多页和单页
- [ ] ....
- [ ] ...
- [ ] ..


## Usage
如果你才刚开始考虑建项目，lemon推荐你使用[lemon-react-app](https://github.com/lemondreamtobe/lemon-react-app)，这是一个已经集成使用了lemon-scripts的react app，项目配置面向生产更加工程化，并且支持移动端适配，做h5项目直接上手，并且已经支持了react18。

```
git clone https://github.com/lemondreamtobe/lemon-react-app react-app

cd react-app
yarn
yarn start
yarn build
```

如果你手上已经有了一个现成的react项目，你可以这样使用lemon-scripts
```
yarn add lemon-scripts
```

```
// package.json
"scripts": {
    "start": "lemon-scripts start",
    "build": "lemon-scripts build"
    "analyze": "lemon-scripts build --analyze"
},
```
但是react项目的复杂度千变万化，每个人搭配的不一样，lemon-scripts不保证一定do work，而且，lemon-scripts是lemon在日常开发工作中的一些总结，也许会夹带一些私货，如果你要去除这些你不需要的东西或者如果你正在使用lemon-scripts，并且遇到了问题，可以先看看以下的说明文档，如果并不能解决你的问题，欢迎提issue。

## Document & Explain

### 支持 less
通过替换了scss正则，以及引入了less-loader，注意原cra不支持less

### 支持svg
```js
import Logo from '@/images/logo.svg';
 <img src={Logo}  />
 or
 <Logo />
```


### 分包&cdn
在lemon-scripts 提前做好了一些工具库的分离，将一些稳定的库不需要被经常打包的依赖存放在cdn，比如react。
通过这样，我们在开发之前就力争提供一个完全pure的环境，让你的bundle尽量只包含你的业务代码。
![app](https://shenshipin-1253925857.cos.ap-guangzhou.myqcloud.com/2022/05/28/03MS4OVzL5KfD07WvNkpqOdcIszQtpjjYuXDMPm1xJ6o8rVW9kh59FuODO1bNkpu_SAanHiMB11841653713358_.pic.jpg)
可以看到，我们将一系列工具库，都提取到了cdn，节省了构建时间和打包效率。
![app2](https://shenshipin-1253925857.cos.ap-guangzhou.myqcloud.com/2022/05/28/03MS4OVzL5KfD07WvNkpqOdcIszQtpjjYuXDMPm1xJ6o8rVW9kh59FuODO1bNkpu_TmPXYjha11851653713376_.pic.jpg)

<font color="red">注意，因为lemon-scripts自带支持将以下依赖抽离成cdn。
react | react-dom | react-router-dom | react-router | mobx |axios | mobx-react-lite。

如果你不需要这些cdn，可以在package.json中加配置来替换：
```js
"cdnModules" : [{name: 'react', path: 'react.min.js'}]
```

lemon-scripts默认使用了[七牛云](http://www.staticfile.org/) 作为cdn服务，如果你想使用自己的cdn，可以在package.json中加配置来替换：</font>
```js
"cdnSourcePaths" : "https://www.baidu.com"
```

### 移动端h5适配
如果你想做移动端的项目，可以在package.json中设置设计尺寸375/750/xxx等等，内置的px2rem-loader将会自动工作。
```js
"designSize": 375
```

### webpack analyze
lemon scripts内置了webpack analyze plugin，如何开启分析，只需要命令行加入 --analyze


### alias resolve
项目中想要alias，因为lemon的项目是ts项目，所以lemon-scripts设计之初，会从tsconfig.paths.json去读。
也就是ts path能读到的module，用了lemon0-scripts都可以通过alias找到。
```js
// tsconfig.paths.json
{
  "compilerOptions": {
    "paths": { 
      "@/global/*": [
        "src/global/*"
      ], 
      "@/helpers/*": [
        "src/helpers/*"
      ],
      "@/components/*": [
        "src/components/*"
      ],
      "@/store/*": [
        "src/store/*"
      ],
      "@/hooks/*": [
        "src/hooks/*"
      ],  
      "@/images/*": [
        "src/images/*"
      ],
      "@/const/*": [
        "src/const/*"
      ],   
      "@/type/*": [
        "src/type/*"
      ],
      "@/pages/*": [
        "src/pages/*"
      ],
    },
  }
```

### 同时支持多页和单页
```js
// package.json
"multiPage": true
```
在package.json设置multiPage，则lemon-scripts将开启多页面模式，会从根目录下的src/pages 中找到所有的pages模块进行打包开发。

## More
由于lemon-scripts是基于cra项目来扩展的，如果lemon-scripts并不能解决你的问题，可以看看[create-react-app](https://create-react-app.dev/docs/advanced-configuration/)，cra支持的lemon都会支持。