---
layout: home
layoutClass: 'layout'
h1: he

hero:
  name: Coding
  text: 小何的笔记文档
  tagline: 记录一些笔记
  image:
    src: /logo.jpg
    alt: VitePress
  actions:
    - theme: brand
      text: 快速开始
      link: /post/note/tools
head:
  - - meta
    - name: keywords
      content: Vue, Javascript, Taro, ReactNative, Webpack, Vite, UniApp, 小程序, H5, Docker, GitGoLang, Node, Nest, Mysql, Redis, 数据结构, 算法
  - - meta
    - name: robots
      content: all
  - - meta
    - http-equiv: x-dns-prefetch-control
      content: on
  - - meta
    - http-equiv: Content-Security-Policy
      content: upgrade-insecure-requests
  - - meta
    - http-equiv: cache-control
      content: no-cache
features:
  - icon: ⚡️
    title: 持续迭代
    details: 该文档长期维护, 内容不断更新
  - icon: 🖖
    title: 高可读性
    details: 文档技术分类清晰, 阅读轻松, 不做过多装饰
  - icon: 🛠️
    title: 全面覆盖
    details: 文档涵盖前后端多种领域知识点, 跨界知识点
---


<style>



/* 对首页的logo图片进行设置blur效果 */

  .image-container {
    position: relative;
    display: inline-block;
  }
  .image-src {
    border-radius: 10%;
    display: block;
    width: 100%;
    height: auto;
    position: relative;
    z-index: 1;
  }

  .image-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10%;
    background-image: url('/logo.jpg'); /* 使用与图片相同的URL */
    background-size: cover;
    filter: blur(100px);
    transform: scale(1.2); /* 放大以创建阴影效果 */
    z-index: -1;
  }

  </style>