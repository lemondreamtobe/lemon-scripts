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
- [ ] 同时支持多页和单页
- [ ] ....
- [ ] ...
- [ ] ..


## Usage
如果你才刚开始考虑建项目，lemon推荐你使用[lemon-react-app](https://github.com/lemondreamtobe/lemon-react-app)，这是一个已经集成使用了lemon-scripts的react app，项目配置面向生产更加工程化，并且支持移动端适配，做h5项目直接上手，并且已经支持了react18。

```
git clone https://github.com/lemondreamtobe/lemon-react-app react-app

cd react-app

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
但是react项目的复杂度千变万化，每个人搭配的不一样，lemon-scripts不保证一定do work，如果你正在使用lemon-scripts，并且遇到了问题，可以先看看以下的说明文档，如果并不能解决你的问题，欢迎提issue。