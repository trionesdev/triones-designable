
## 简介

本项目是基于 [designable](https://github.com/alibaba/designable) 重新做了基于father的构建，以及升级到antd v5。

由于designable依赖antd,为了可以自由选择组件库，我们参考designable的设计思路，重新开发了一款表单组件。https://github.com/trionesdev/triones-form-designer

## 本地启动
安装依赖
```
yarn install
```
 打包组件
```
yarn build
```
启动范例
进入到 examples/basic目录下，执行启动命令
```
yarn start
```
> 如果想进行调试，则进入对应的组件目录下，执行 ``yarn dev``


## 推送私仓
以coding的私仓为例，添加一个命令,指定私仓地址
```
"codingPublish": "lerna publish --registry=https://moensun-npm.pkg.coding.net/npm/moensun/"
```

#### 互相吹捧，共同进步
<div style="width: 100%;text-align: center">
<img src="images/shuque_wx.jpg" width="200px" alt="">
</div>