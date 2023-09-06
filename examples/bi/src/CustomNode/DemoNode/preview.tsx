import { createBehavior, createResource } from "@alkaid/core";
import {
  AllLocales,
  AllSchemas,
  createVoidFieldSchema,
} from "@alkaid/formily-antd";
import { DnFC } from "@alkaid/react";
import { observer } from "@formily/reactive-react";

import React from "react";

export const DemoNode: DnFC<React.ComponentProps<any>> = observer((props) => {
  // console.log(props);
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
    </div>
  );
});
console.log(createVoidFieldSchema(AllSchemas.Text));
DemoNode.Behavior = createBehavior({
  name: "DemoNode",
  extends: ["FloatWrapper"],
  selector: (node) => node.props["x-component"] === "DemoNode",

  designerProps: {
    propsSchema: createVoidFieldSchema(AllSchemas.Text),
  },
  designerLocales: AllLocales.Text,
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
