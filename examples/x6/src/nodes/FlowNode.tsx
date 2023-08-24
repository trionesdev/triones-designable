import { DnFC } from "@alkaid/react";
import { ISchema } from "@formily/react";
import { observer } from "@formily/reactive-react";
import { createBehavior } from "@alkaid/core";

export const FlowNode: DnFC<ISchema> = observer((props) => {
  return <></>;
});

FlowNode.Behavior = createBehavior({
  name: "FlowNode",
  selector: "FlowNode",
  designerLocales: {
    "zh-CN": {
      settings: {
        name: "字段标识",
        title: "标题",
        required: "必填",
        description: "描述",
        default: "默认值",
        enum: "可选项",
        "node-props-group": "节点属性",
      },
    },
  },
});
