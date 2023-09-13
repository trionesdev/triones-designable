import { createBehavior, createResource } from "@alkaid/core";
import {
  AllLocales,
  AllSchemas,
  // createVoidFieldSchema,
} from "@alkaid/formily-antd";
import { DnFC } from "@alkaid/react";
import { observer } from "@formily/reactive-react";
import { Pie, PieConfig } from "@ant-design/charts";

import React from "react";
import { createVoidFieldSchema } from "../FloatWrapper";

export const DemoNode: DnFC<React.ComponentProps<any>> = observer((props) => {
  // console.log(props);
  const data = [
    {
      type: "分类一",
      value: 27,
    },
    {
      type: "分类二",
      value: 25,
    },
    {
      type: "分类三",
      value: 18,
    },
    {
      type: "分类四",
      value: 15,
    },
    {
      type: "分类五",
      value: 10,
    },
    {
      type: "其他",
      value: 5,
    },
  ];
  const config: PieConfig = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  console.log(props);
  return (
    <div
      {...props}
      style={{
        // position: "relation",
        ...props?.style,
      }}
      // data-content-editable={"x-component-props.content"}
    >
      demo{props?.content}
      <div style={{ width: 300, height: 300 }}>
        <Pie {...config} supportCSSTransform />
      </div>
    </div>
  );
});
console.log(createVoidFieldSchema(AllSchemas.Text));
DemoNode.Behavior = createBehavior({
  name: "DemoNode",
  extends: ["FloatWrapper"],
  selector: (node) => node.props["x-component"] === "DemoNode",

  designerProps: {
    propsSchema: createVoidFieldSchema(),
  },
  // designerLocales: AllLocales.Text,
  // designerProps(node) {
  //   return {
  //     propsSchema: {
  //       type: "object",
  //       properties: {
  //         style: {
  //           type: "void",
  //           properties: {
  //             "style.width": {
  //               type: "string",
  //               "x-decorator": "FormItem",
  //               "x-component": "SizeInput",
  //             },
  //             "style.height": {
  //               type: "string",
  //               "x-decorator": "FormItem",
  //               "x-component": "SizeInput",
  //             },
  //             "style.background": {
  //               "x-component": "BackgroundStyleSetter",
  //             },
  //             "style.opacity": {
  //               "x-decorator": "FormItem",
  //               "x-component": "Slider",
  //               "x-component-props": {
  //                 defaultValue: 1,
  //                 min: 0,
  //                 max: 1,
  //                 step: 0.01,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   };
  // },
  // designerLocales: {
  //   "zh-CN": {
  //     title: "自定义容器",
  //     settings: {
  //       style: {
  //         width: "宽度",
  //         height: "高度",
  //         background: "背景",
  //         opacity: "透明度",
  //       },
  //     },
  //   },
  // },
});

// 左侧组件配置
DemoNode.Resource = createResource({
  title: { "zh-CN": "自定义容器", "en-US": "自定义容器" },
  icon: "FormLayoutSource",
  elements: [
    {
      componentName: "FloatWrapper",
      props: {
        type: "string",
        "x-component": "DemoNode",
      },
    },
  ],
});
