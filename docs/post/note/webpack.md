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

:::warning  常见的Plugin
  - `AggressiveSplittingPlugin`：将原来的chunk 分成更小的 chunk
  - `BabelMinifyWebpackPlugin`：使用 babel-minify进行压缩
  - `BannerPlugin`：在每个生成的 chunk 顶部添加 banner
  - `CommonsChunkPlugin`：提取 chunks 之间共享的通用模块
  - `CompressionWebpackPlugin`：预先准备的资源压缩版本，使用 Content-Encoding提供访问服务
  - `ContextReplacementPlugin`：重写 require 表达式的推断上下文
  - `CopyWebpackPlugin`：将单个文件或整个目录复制到构建目录
  - `DefinePlugin`：允许在编译时(compile time)配置的全局常量
  - `DllPlugin`：为了极大减少构建时间，进行分离打包
  - `EnvironmentPlugin`：DefinePlugin 中 process.env 键的简写方式
  - `ExtractTextWebpackPlugin`：从 bundle 中提取文本 (CSS) 到单独的文件
  - `HotModuleReplacementPlugin`：启用模块热替换(Enable Hot Module Replacement-HMR)
  - `HtmlWebpackPlugin`：简单创建 HTML 文件，用于服务器访问
  - `I18nWebpackPlugin`：为 bundle 增加国际化支持
  - `IgnorePlugin`：从 bundle 中排除某些模块
  - `LimitChunkCountPlugin`：设置 chunk 的最小/最大限制，以微调和控制 chunk
  - `LoaderOptionsPlugin`：用于从 webpack 1 迁移到 webpack 2
  - `MinChunkSizePlugin`：确保 chunk 大小超过指定限制
  - `NoEmitOnErrorsPlugin`：在输出阶段时，遇到编译错误跳过
  - `NormalModuleReplacementPlugin`：替换与正则表达式匹配的资源
:::