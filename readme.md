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

> 如果想进行调试，则进入对应的组件目录下，执行 `yarn dev`
> 如果报错找不到依赖，请事先进入formily和packages目录下的所有子组件的应用中，执行启动命令 `yarn dev`

## 推送私仓

以coding的私仓为例，添加一个命令,指定私仓地址

```
"codingPublish": "lerna publish --registry=https://moensun-npm.pkg.coding.net/npm/moensun/"
```

## 提交

规范提交代码

```
# 修复bug fix(bug号): bug内容
fix(bug-view-xxx): 修复了一个致命的bug
# feature feat(任务号): 任务内容
feat(task-view-xxx): 增加了一个新功能
# 主要type

feat:     增加新功能
fix:      修复bug

# 特殊type

docs:     只改动了文档相关的内容
style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
build:    构造工具的或者外部依赖的改动，例如webpack，npm
refactor: 代码重构时使用
revert:   执行git revert打印的message

# 暂不使用type

test:     添加测试或者修改现有测试
perf:     提高性能的改动
ci:       与CI（持续集成服务）有关的改动
chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动

```

#### 互相吹捧，共同进步

##### 联系:如果issue回复较慢，可以通过公众号直接发信息

<div style="width: 100%;text-align: center">
<img src="images/shuque_wx.jpg" width="200px" alt="">
</div>
