# Webpack

## 1. 说说你对webpack的理解？解决了什么问题？

:::tip 背景
  - `Webpack`最初的目标是实现前端项目的模块化，旨在更高效地管理和维护项目中的每一个资源
  - 模块化：
    - 最早的时候，我们会通过文件划分的形式实现模块化，也就是将每个功能及其相关状态数据各自单独放到不同的`JS`文件中
    - 约定每个文件是一个独立的模块，然后再将这些`JS`文件引入到页面，一个`script`标签对应一个模块，然后调用模块化的成员
      ```javascript
      <script src="module-a.js"></script>
      <script src="module-b.js"></script>
      ```
    - 但这种模块弊端十分的明显，模块都是在全局中工作，大量模块成员污染了环境，模块与模块之间并没有依赖关系、维护困难、没有私有空间等问题
    - 项目一旦变大，上述问题会尤其明显
    - 随后，就出现了命名空间方式，规定每个模块只暴露一个全局对象，然后模块的内容都挂载到这个对象中
      ```javascript
      window.moduleA = {
        method1: function () {
          console.log('moduleA#method1')
        }
      }
      ```
    - 这种方式也并没有解决第一种方式的依赖等问题
    - 再后来，我们使用立即执行函数为模块提供私有空间，通过参数的形式作为依赖声明，如下：
      ```javascript
      // module-a.js
      (function ($) {
        var name = 'module-a'
        function method1 () {
          console.log(name + '#method1')
          $('body').animate({ margin: '200px' })
        }
        window.moduleA = {
          method1: method1
        }
      })(jQuery)
      ```
    - 上述的方式都是早期解决模块的方式，但是仍然存在一些没有解决的问题。例如，我们是用过`script`标签在页面引入这些模块的，这些模块的加载并不受代码的控制，时间一久维护起来也十分的麻烦
    - 理想的解决方式是，在页面中引入一个`JS`入口文件，其余用到的模块可以通过代码控制，按需加载进来，除了模块加载的问题以外，还需要规定模块化的规范，如今流行的则是`CommonJS`、`ES Modules`
:::

:::tip 问题
  - 从后端渲染的`JSP`、`PHP`，到前端原生`JavaScript`，再到`Jquery`开发，再到目前的三大框架`Vue`、`React`、Angular
  - 开发方式，也从`Javascript`到后面的`ES5`、`ES6`、`7`、`8`、`9`、`10`，再到`TypeScript`，包括编写`CSS`的预处理器`less`、`scss`等
  - 现代前端开发已经变得十分的复杂，所以我们开发过程中会遇到如下的问题：
    - 需要通过模块化的方式来开发
    - 使用一些高级的特性来加快我们的开发效率或者安全性，比如通过`ES6`、`TypeScript`开发脚本逻辑，通过`sass`、`less`等方式来编写`css`样式代码
    - 监听文件的变化来并且反映到浏览器上，提高开发的效率
    - `JavaScript`代码需要模块化，`HTML`和`CSS`这些资源文件也会面临需要被模块化的问题
    - 开发完成后我们还需要将代码进行压缩、合并以及其他相关的优化
:::

:::tip 是什么 
  - `Webpack`是一个用于现代`JavaScript`应用程序的静态模块打包工具
    - 静态模块：
      - 这里的静态模块指的是开发阶段，可以被`Webpack`直接引用的资源（可以直接被获取打包进`bundle.js`的资源）
      - 当`Webpack`处理应用程序时，它会在内部构建一个依赖图，此依赖图对应映射到项目所需的每个模块（不再局限`js`文件），并生成一个或多个`bundle`
         ![pic](/webpack1.png "notice")
    - `Webpack`的能力：
      - 编译代码能力，提高效率，解决浏览器兼容问题
        ![pic](/webpack2.png "notice")
      - 模块整合能力，提高性能，可维护性，解决浏览器频繁请求文件的问题
        ![pic](/webpack3.png "notice")
      - 万物皆可模块能力，项目维护性增强，支持不同种类的前端模块类型，统一的模块化方案，所有资源文件的加载都可以通过代码控制
        ![pic](/webpack4.png "notice")
:::

## 2. 说说webpack的构建流程?

:::tip 运行流程
  - `Webpack`的运行流程是一个串行的过程，它的工作流程就是将各个插件串联起来
  - 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条`Webpack`机制中，去改变`Webpack`的运作，使得整个系统扩展性良好
  - 从启动到结束会依次执行以下三大步骤：
    - 初始化流程：从配置文件和`Shell`语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的参数
    - 编译构建流程：从`Entry`发出，针对每个`Module`串行调用对应的`Loader`去翻译文件内容，再找到该`Module`依赖的`Module`，递归地进行编译处理
    - 输出流程：对编译后的`Module`组合成`Chunk`，把`Chunk`转换成文件，输出到文件系统
    ![pic](/webpack5.png "notice")
:::
:::tip 初始化流程
  - 从配置文件和`Shell`语句中读取与合并参数，得出最终的参数
  - 配置文件默认下为`webpack.config.js`，也或者通过命令的形式指定配置文件，主要作用是用于激活`webpack`的加载项和插件
  - 关于文件配置内容分析，如下注释：
    ```javascript
    var path = require('path')
    var node_modules = path.resolve(__dirname, 'node_modules')
    var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js')
    module.exports = {
      // 入口文件，是模块构建的起点，同时每一个入口文件对应最后生成的一个chunk
      entry: './path/to/my/entry/file.js'，
      // 文件路径指向(可加快打包过程)
      resolve: {
        alias: {
          'react': pathToReact
        }
      },
      // 生成文件，是模块构建的终点，包括输出文件与输出路径
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
      },
      // 这里配置了处理各模块的loader:包括css loader,es6 loader,图片处理 loader
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'react']
            }
          }
        ],
        noParse: [pathToReact]
      },
      // webpack 各插件对象，在webpack的事件流中执行对应的方法
      plugins: [
        new webpack.HotModuleReplacementPlugin()
      ]
    }
    ```
  - `webpack`将`webpack.config.js`中的各个配置项拷贝到`options`对象中，并加载用户配置的`plugins`
  - 完成上述步骤之后，则开始初始化`Compiler`编译对象，该对象掌控者`webpack`声明周期，不执行具体的任务，只是进行一些调度工作
    ```javascript
    class Compiler extends Tapable {
      constructor(context) {
        super()
        this.hooks = {
          beforeCompile: new AsyncSeriesHook(["params"])
          compile: new SyncHook(["params"])
          afterCompile: new AsyncSeriesHook(["compilation"])
          make: new AsyncParallelHook(["compilation"])
          entryOption: new SyncBailHook(["context", "entry"])
          // 定义了很多不同类型的钩子
        }
          // ...
      }
    }
    function webpack(options) {
      var compiler = new Compiler()
      ...// 检查options,若watch字段为true,则开启watch线程
      return compiler
    }
    ...
    ```
  - `Compiler`对象继承自`Tapable`，初始化时定义了很多钩子函数
:::

:::tip 编译构建流程
  - 根据配置中的`entry`找出所有的入口文件
    ```javascript
    module.exports = {
      entry: './src/index.js'
    }
    ```
  - 初始化完成后会调用`Compiler`的`run`来真正启动`webpack`编译构建流程，主要流程如下：
    - `compile`开始编译
      - 执行了`run`方法后，首先会触发`compile`，主要是构建一个`Compilation`对象
      - 该对象是编译阶段的主要执行者，主要会依次下述流程：执行模块创建、依赖收集、分块、打包等主要任务的对象
    - `make`从入口点分析模块及其依赖的模块，创建这些模块对象
      - 当完成了上述的`compilation`对象后，就开始从`Entry`入口文件开始读取，主要执行`_addModuleChain()`函数，过程如下：
        - `_addModuleChain`中接收参数`dependency`传入的入口依赖，使用对应的工厂函数
        - `NormalModuleFactory.create`方法生成一个空的`module`对象
        - 回调中会把此`module`存入`compilation.modules`对象和`dependencies.module`对象中，由于是入口文件，也会存入`compilation.entries`中
        - 随后执行`buildModule`进入真正的构建模块`module`内容的过程
        ```javascript
          _addModuleChain(context, dependency, onModule, callback) {
          ...
          // 根据依赖查找对应的工厂函数
          const Dep = /** @type {DepConstructor} */ (dependency.constructor)
          const moduleFactory = this.dependencyFactories.get(Dep)
          // 调用工厂函数NormalModuleFactory的create来生成一个空的NormalModule对象
          moduleFactory.create({
            dependencies: [dependency]
            ...
          }, (err, module) => {
            ...
            const afterBuild = () => {
              this.processModuleDependencies(module, err => {
              if (err) return callback(err)
              callback(null, module)
              })
            }
            this.buildModule(module, false, null, null, err => {
              ...
              afterBuild()
            })
          })
        }
        ```
    - `build-module`构建模块
      - 这里主要调用配置的`loaders`，将我们的模块转成标准的JS模块
      - 在用`Loader`对一个模块转换完后，使用`acorn`解析转换后的内容，输出对应的抽象语法树（`AST`），以方便`Webpack`后面对代码的分析
      - 从配置的入口模块开始，分析其`AST`，当遇到`require`等导入其它模块语句时，便将其加入到依赖的模块列表，同时对新找出的依赖模块递归分析，最终搞清所有模块的依赖关系
    - `seal`封装构建结果
      - `seal`方法主要是要生成`chunks`，对`chunks`进行一系列的优化操作，并生成要输出的代码
      - `Webpack`中的`chunk`，可以理解为配置在`Entry`中的模块，或者是动态引入的模块
      - 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的`Chunk`，再把每个`Chunk`转换成一个单独的文件加入到输出列表
    - `emit`把各个`chunk`输出到结果文件
      - 在确定好输出内容后，根据配置确定输出的路径和文件名
        ```javascript
        output: {
          path: path.resolve(__dirname, 'build'),
            filename: '[name].js'
        }
        ```
  - 在`Compiler`开始生成文件前，钩子`emit`会被执行，这是我们修改最终文件的最后一个机会
  - 小结：
  ![pic](/webpack6.png "notice")
:::
## 3.  说说webpack中常见的Loader？

:::tip Loader是什么
  - `loader`用于对模块的"源代码"进行转换，在`import`或"加载"模块时预处理文件
  - `Webpack`做的事情，仅仅是分析出各种模块的依赖关系，然后形成资源列表，最终打包生成到指定的文件中
  - 在`Webpack`内部中，任何文件都是模块，不仅仅只是`JS`文件
  - 默认情况下，在遇到`import`或者`require`加载模块的时候，`Webpack`只支持对`JS`和`Json`文件打包
  - 像`css`、`sass`、`png`等这些类型的文件的时候，`Webpack`则无能为力，这时候就需要配置对应的`loader`进行文件内容的解析
  - 当`Webpack`碰到不识别的模块的时候，`Webpack`会在配置的中查找该文件解析规则
  - 关于配置`loader`的方式有三种：
    - 配置方式（推荐）：在 `webpack.config.js`文件中指定`loader`
    - 内联方式：在每个`import`语句中显式指定`loader`
    - `CLI`方式：在`shell`命令中指定它们
:::

:::tip  配置方式
  - 关于`loader`的配置，我们是写在`module.rules`属性中，属性介绍如下：
    - `rules`是一个数组的形式，因此我们可以配置很多个`loader`
    - 每一个`loader`对应一个对象的形式，对象属性`test`为匹配的规则，一般情况为正则表达式
    - 属性`use`针对匹配到文件类型，调用对应的`loader`进行处理
  - 代码编写，如下形式：
    ```javascript
      module.exports = {
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [
                { loader: 'style-loader' },
                {
                  loader: 'css-loader',
                  options: {
                    modules: true
                  }
                },
                { loader: 'sass-loader' }
              ]
            }
          ]
        }
      }
    ```
:::

:::tip 特性
  - 从上述代码可以看到，在处理`css`模块的时候，`use`属性中配置了三个`loader`分别处理`css`文件
  - 因为`loader`支持链式调用，链中的每个`loader`会处理之前已处理过的资源，最终变为`JS`代码。顺序为相反的顺序执行，即上述执行方式为`sass-loader`、`css-loader`、`style-loader`
  - 除此之外，`loader`的特性还有如下：
    - `loader`可以是同步的，也可以是异步的
    - `loader`运行在`Node.js`中，并且能够执行任何操作
    - 除了常见的通过`package.json`的`main`来将一个`npm`模块导出为`loader`，还可以在`module.rules`中使用`loader`字段直接引用一个模块
    - 插件(`plugin`)可以为`loader`带来更多特性
    - `loader`能够产生额外的任意文件
  - 可以通过`loader`的预处理函数，为`JavaScript`生态系统提供更多能力。用户现在可以更加灵活地引入细粒度逻辑，例如：压缩、打包、语言翻译和更多其他特性
:::

:::warning 常见的Loader
 - 在页面开发过程中，我们经常性加载除了`JS`文件以外的内容，这时候我们就需要配置响应的`loader`进行加载
 - 常见的`loader`如下：
   - `style-loader`: 将css添加到DOM的内联样式标签style里
   - `css-loader` :允许将css文件通过require的方式引入，并返回css代码
   - `less-loader`: 处理less
   - `sass-loader`: 处理sass
   - `postcss-loader`: 用postcss来处理CSS
   - `autoprefixer-loader`: 处理CSS3属性前缀，已被弃用，建议直接使用postcss
   - `file-loader`: 分发文件到output目录并返回相对路径
   - `url-loader`: 和file-loader类似，但是当文件小于设定的limit时可以返回一个Data Url
   - `html-minify-loader`: 压缩HTML
   - `babel-loader` :用babel来转换ES6文件到ES5
:::

## 4. 说说webpack中常见的Plugin？
:::tip Plugin是什么
  - `Plugin`是一种计算机应用程序，它和主应用程序互相交互，以提供特定的功能
  - 是一种遵循一定规范的应用程序接口编写出来的程序，只能运行在程序规定的系统下，因为其需要调用原纯净系统提供的函数库或者数据
  - `Webpack`中的`plugin`也是如此，`plugin`赋予其各种灵活的功能，例如打包优化、资源管理、环境变量注入等，它们会运行在`webpack`的不同阶段（钩子/生命周期），贯穿了`Webpack`整个编译周期
  - 目的在于解决`loader`无法实现的其他事
:::
:::tip 配置方式
  - 一般情况，通过配置文件导出对象中`plugins`属性传入`new`实例对象。如下所示：
    ```javascript
    const HtmlWebpackPlugin = require('html-webpack-plugin') // 通过 npm 安装
    const webpack = require('webpack'); // 访问内置的插件
    module.exports = {
      ...
      plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' })
      ]
    }
    ```
:::
:::tip 特性
  - 其本质是一个具有`apply`方法`Javascript`对象
  - `apply`方法会被`Webpack compiler`调用，并且在整个编译生命周期都可以访问`compiler`对象
    ```javascript
      const pluginName = 'ConsoleLogOnBuildWebpackPlugin'
      class ConsoleLogOnBuildWebpackPlugin {
        apply(compiler) {
          compiler.hooks.run.tap(pluginName, (compilation) => {
            console.log('webpack 构建过程开始！')
          });
        }
      }
      module.exports = ConsoleLogOnBuildWebpackPlugin
    ```
  - `compiler hook`的`tap`方法的第一个参数，应是驼峰式命名的插件名称
  - 关于整个编译生命周期钩子，有如下：
    - `entry-option` ：初始化option
    - `run`
    - `compile`： 真正开始的编译，在创建compilation对象之前
    - `compilation` ：生成好了compilation对象
    - `make` 从`entry`开始递归分析依赖，准备对每个模块进行build
    - `after-compile`：编译build过程结束
    - `emit` ：在将内存中assets内容写到磁盘文件夹之前
    - `after-emit` ：在将内存中assets内容写到磁盘文件夹之后
    - `done`： 完成所有的编译过程
    - `failed`： 编译失败的时候
:::

#### 常见的Plugin
```bash
# 将原来的chunk 分成更小的 chunk
AggressiveSplittingPlugin
# 使用 babel-minify进行压缩
BabelMinifyWebpackPlugin
# 在每个生成的 chunk 顶部添加 banner
BannerPlugin
# 提取 chunks 之间共享的通用模块
CommonsChunkPlugin
# 预先准备的资源压缩版本，使用 Content-Encoding提供访问服务
CompressionWebpackPlugin
# 重写 require 表达式的推断上下文
ContextReplacementPlugin
# 将单个文件或整个目录复制到构建目录
CopyWebpackPlugin
# 允许在编译时(compile time)配置的全局常量
DefinePlugin
# 为了极大减少构建时间，进行分离打包
DllPlugin
# DefinePlugin 中 process.env 键的简写方式
EnvironmentPlugin
# 从 bundle 中提取文本 (CSS) 到单独的文件
ExtractTextWebpackPlugin
# 启用模块热替换(Enable Hot Module Replacement-HMR)
HotModuleReplacementPlugin
# 简单创建 HTML 文件，用于服务器访问
HtmlWebpackPlugin
# 为 bundle 增加国际化支持
I18nWebpackPlugin
# 从 bundle 中排除某些模块
IgnorePlugin
# 设置 chunk 的最小/最大限制，以微调和控制 chunk
LimitChunkCountPlugin
# 用于从 webpack 1 迁移到 webpack 2
LoaderOptionsPlugin
# 确保 chunk 大小超过指定限制
MinChunkSizePlugin
# 在输出阶段时，遇到编译错误跳过
NoEmitOnErrorsPlugin
# 替换与正则表达式匹配的资源
NormalModuleReplacementPlugin
```

## 5.  编写Loader，Plugin的思路？

:::tip 区别
  - `loader`是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中
  - `plugin`赋予了`Webpack`各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决`loader`无法实现的其他事
  - 从整个运行时机上来看，如下图所示：
  ![pic](/loader1.png "notice")
  - 可以看到，两者在运行时机上的区别：
    - `loader`运行在打包文件之前
    - `plugins`在整个编译周期都起作用
  - 在`Webpack`运行的生命周期中会广播出许多事件，`Plugin`可以监听这些事件，在合适的时机通过`Webpack`提供的`API`改变输出结果
  - 对于`loader`，实质是一个转换器，将A文件进行编译形成B文件，操作的是文件，比如将`A.scss`或`A.less`转变为`B.css`，单纯的文件转换过程
:::

:::danger 编写loader
  - 在编写`loader`前，我们首先需要了解`loader`的本质
  - 其本质为函数，函数中的`this`作为上下文会被`Webpack`填充，因此我们不能将`loader`设为一个箭头函数
  - 函数接受一个参数，为`Webpack`传递给`loader`的文件源内容
  - 函数中`this`是由`Webpack`提供的对象，能够获取当前`loader`所需要的各种信息
  - 函数中有异步操作或同步操作，异步操作通过`this.callback`返回，返回值要求为`string`或者`Buffer`
  - 代码如下所示：
    ```javascript
    // 导出一个函数，source为webpack传递给loader的文件源内容
    module.exports = function(source) {
      const content = doSomeThing2JsString(source)
      // 如果 loader 配置了 options 对象，那么this.query将指向 options
      const options = this.query
      // 可以用作解析其他模块路径的上下文
      console.log('this.context')
      /*
      * this.callback 参数：
      * error：Error | null，当 loader 出错时向外抛出一个 error
      * content：String | Buffer，经过 loader 编译后需要导出的内容
      * sourceMap：为方便调试生成的编译后内容的 source map
      * ast：本次编译生成的 AST 静态语法树，之后执行的loader可以直接使用这个 AST，进而省去重复生成AST的过程
      */
      this.callback(null, content) // 异步
      return content // 同步
    }
    ```
    - 一般在编写`loader`的过程中，保持功能单一，避免做多种功能
    - 如`less`文件转换成`css`文件也不是一步到位，而是`less-loader`、`css-loader`、`style-loader`几个`loader`的链式调用才能完成转换
:::


::: tip 编写plugin
  - 由于`Webpack`基于发布订阅模式，在运行的生命周期中会广播出许多事件，插件通过监听这些事件，就可以在特定的阶段执行自己的插件任务
  - `Webpack`编译会创建两个核心对象：
    - `compiler`：包含了`Webpack`环境的所有的配置信息，包括`options`，`loader`和`plugin`和`Webpack`整个生命周期相关的钩子
    - `compilation`：作为`plugin`内置事件回调函数的参数，包含了当前的模块资源、编译生成资源、变化的文件以及被跟踪依赖的状态信息。当检测到一个文件变化，一次新的 `Compilation`将被创建
  - 如果自己要实现`plugin`，也需要遵循一定的规范：
    - 插件必须是一个函数或者是一个包含`apply`方法的对象，这样才能访问`compiler`实例
    - 传给每个插件的`compiler`和`compilation`对象都是同一个引用，因此不建议修改
    - 异步的事件需要在插件处理完任务时调用回调函数通知`Webpack`进入下一个流程，不然会卡住
  - 实现`plugin`的模板如下：
    ```javascript
    class MyPlugin {
        // Webpack 会调用 MyPlugin 实例的 apply 方法给插件实例传入 compiler 对象
      apply (compiler) {
        // 找到合适的事件钩子，实现自己的插件功能
        compiler.hooks.emit.tap('MyPlugin', compilation => {
          // compilation: 当前打包构建流程的上下文
          console.log(compilation)
          // do something...
        })
      }
    }
    ```
  - 在`emit`事件发生时，代表源文件的转换和组装已经完成，可以读取到最终将输出的资源、代码块、模块及其依赖，并且可以修改输出资源的内容
:::

## 6. 说说webpack的热更新是如何做到的？原理是什么？

:::tip 是什么
  - `HMR`全称 `Hot Module Replacement`，可以理解为模块热替换，指在应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个应用
  - 例如，我们在应用运行过程中修改了某个模块，通过自动刷新会导致整个应用的整体刷新，那页面中的状态信息都会丢失
  - 如果使用的是`HMR`，就可以实现只将修改的模块实时替换至应用中，不必完全刷新整个应用
  - 在`Webpack`中配置开启热模块也非常的简单，如下代码：
    ```javascript
    const webpack = require('webpack')
    module.exports = {
      // ...
      devServer: {
        // 开启 HMR 特性
        hot: true
        // hotOnly: true
      }
    }
    ```
  - 通过上述这种配置，如果我们修改并保存`css`文件，确实能够以不刷新的形式更新到页面中
  - 但是，当我们修改并保存`js`文件之后，页面依旧自动刷新了，这里并没有触发热模块
  - 所以，`HMR`并不像`Webpack`的其他特性一样可以开箱即用，需要有一些额外的操作
  - 我们需要去指定哪些模块发生更新时进行HRM，如下代码
    ```javascript
    if(module.hot){
      module.hot.accept('./index.js',()=>{
        console.log("index.js更新了")
      })
    }
    ```
:::

:::tip 实现原理
  - 首先来看看一张图，如下：
  ![pic](/hrm1.png "notice")
    - `Webpack Compile`：将`JS`源代码编译成`bundle.js`
    - `HMR Server`：用来将热更新的文件输出给`HMR Runtime`
    - `Bundle Server`：静态资源文件服务器，提供文件访问路径
    - `HMR Runtime`：`socket`服务器，会被注入到浏览器，更新文件的变化
    - `bundle.js`：构建输出的文件
    - 在`HMR Runtime`和`HMR Server`之间建立`websocket`，即图上4号线，用于实时更新文件变化
  - 上面图中，可以分成两个阶段：
    - 启动阶段为上图`1 - 2 - A - B`
      - 在编写未经过`Webpack`打包的源代码后，`Webpack Compile`将源代码和`HMR Runtime`一起编译成`bundle`文件，传输给`Bundle Server`静态资源服务器
    - 更新阶段为上图`1 - 2 - 3 - 4`
      - 当某一个文件或者模块发生变化时，`Webpack`监听到文件变化对文件重新编译打包，编译生成唯一的`hash`值，这个`hash`值用来作为下一次热更新的标识
      - 根据变化的内容生成两个补丁文件：`manifest`（包含了`hash`和`chunkId`，用来说明变化的内容）和`chunk.js` 模块
      - 由于`socket`服务器在`HMR Runtime`和`HMR Server`之间建立`websocket`链接，当文件发生改动的时候，服务端会向浏览器推送一条消息，消息包含文件改动后生成的`hash`值，如下图的h属性，作为下一次热更细的标识
      ![pic](/hrm2.png "notice")
      - 在浏览器接受到这条消息之前，浏览器已经在上一次`socket`消息中已经记住了此时的`hash`标识，这时候我们会创建一个`ajax`去服务端请求获取到变化内容的`manifest`文件
      - `manifest`文件包含重新`build`生成的`hash`值，以及变化的模块，对应上图的c属性
      - 浏览器根据`manifest`文件获取模块变化的内容，从而触发`render`流程，实现局部模块更新
      ![pic](/hrm3.png "notice")
:::

:::warning 总结
  - 关于`Webpack`热模块更新的总结如下：
    - 通过`webpack-dev-server`创建两个服务器：提供静态资源的服务（`express`）和`Socket`服务
    - `express server`负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）
    - `socket server`是一个`websocket`的长连接，双方可以通信
    - 当`socket server`监听到对应的模块发生变化时，会生成两个文件.json（`manifest`文件）和.js文件（`update chunk`）
    - 通过长连接，`socket server`可以直接将这两个文件主动发送给客户端（浏览器）
    - 浏览器拿到两个新的文件后，通过`HMR runtime`机制，加载这两个文件，并且针对修改的模块进行更新
:::

## 7. 说说webpack proxy工作原理？为什么能解决跨域?

:::tip 是什么
  - `Webpack proxy`，即`Webpack`提供的代理服务
    - 基本行为就是接收客户端发送的请求后转发给其他服务器
    - 其目的是为了便于开发者在开发模式下解决跨域问题（浏览器安全策略限制）
    - 想要实现代理首先需要一个中间服务器，`Webpack`中提供服务器的工具为`webpack-dev-server`
  - `webpack-dev-server`
    - `webpack-dev-server`是`Webpack`官方推出的一款开发工具，将自动编译和自动刷新浏览器等一系列对开发友好的功能全部集成在了一起
    - 目的是为了提高开发者日常的开发效率，只适用在开发阶段
    - 关于配置方面，在`Webpack`配置对象属性中通过`devServer`属性提供，如下：
      ```javascript
      // ./webpack.config.js
        const path = require('path')
        module.exports = {
          // ...
          devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000,
            proxy: {
                '/api': {
                    target: 'https://api.github.com'
                }
            }
            // ...
          }
        }
      ```
    - `devServer`里面`Proxy`则是关于代理的配置，该属性为对象的形式，对象中每一个属性就是一个代理的规则匹配
    - 属性的名称是需要被代理的请求路径前缀，一般为了辨别都会设置前缀为/api，值为对应的代理匹配规则，对应如下：
      - `target`：表示的是代理到的目标地址
      - `pathRewrite`：默认情况下，我们的 /api-hy 也会被写入到URL中，如果希望删除，可以使用pathRewrite
      - `secure`：默认情况下不接收转发到https的服务器上，如果希望支持，可以设置为false
      - `changeOrigin`：它表示是否更新代理后请求的 headers 中host地址
:::

:::tip 工作原理
  - `Proxy`工作原理实质上是利用`http-proxy-middleware` 这个`http`代理中间件，实现请求转发给其他服务器
  - 在开发阶段，本地地址为`http://localhost:3000`，该浏览器发送一个前缀带有/api标识的请求到服务端获取数据，但响应这个请求的服务器只是将请求转发到另一台服务器中
    ```javascript
    const express = require('express')
    const proxy = require('http-proxy-middleware')
    const app = express()
    app.use('/api', proxy({
      target: 'http://www.example.com', 
      changeOrigin: true}))
    app.listen(3000);
    // http://localhost:3000/api/foo/bar -> http://www.example.com/api/foo/bar
    ```
:::


:::tip 跨域
  - 在开发阶段，`webpack-dev-server`会启动一个本地开发服务器，所以我们的应用在开发阶段是独立运行在`localhost`的一个端口上，而后端服务又是运行在另外一个地址上
  - 所以在开发阶段中，由于浏览器同源策略的原因，当本地访问后端就会出现跨域请求的问题
  - 通过设置`Webpack proxy`实现代理请求后，相当于浏览器与服务端中添加一个代理者
  - 当本地发送请求的时候，代理服务器响应该请求，并将请求转发到目标服务器，目标服务器响应数据后再将数据返回给代理服务器，最终再由代理服务器将数据响应给本地
  ![pic](/proxy1.png "notice")
  - 在代理服务器传递数据给本地浏览器的过程中，两者同源，并不存在跨域行为，这时候浏览器就能正常接收数据
  - 注意：`服务器与服务器之间请求数据并不会存在跨域行为，跨域行为是浏览器安全策略限制`
:::

## 8. 说说如何借助webpack来优化前端性能？
```bash
# JS 代码压缩
terser-webpack-plugin
# CSS 代码压缩
css-minimizer-webpack-plugin
# HTML 文件代码压缩
HtmlWebpackPlugin
# 文件大小压缩
compression-webpack-plugin
# 图片压缩
image-webpack-loader
# Tree Shaking
usedExports/sideEffects
# 代码分离
splitChunksPlugin
# 将代码块（chunk）直接内联到 HTML 文件中，从而减少请求数量并提高加载速度
ChunkInlineChunkHtmlPlugin
```

## 9. 如何提高webpack的构建速度？
```bash
- 优化`loader`配置
- 合理使用`resolve.extensions`
- 优化`resolve.modules`
- 优化`resolve.alias`
- 使用`DLLPlugin`插件
- 使用`cache-loader`
- `terser`启动多线程
- 合理使用`sourceMap`
```