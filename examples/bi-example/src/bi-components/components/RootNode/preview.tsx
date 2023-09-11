import React, { useMemo } from "react";
import { createBehavior, createResource } from "@alkaid/core";
import { createForm } from "@formily/core";
import { observer } from "@formily/react";
import { Form as FormilyForm } from "@formily/antd-v5";
import { usePrefix, DnFC, useCssInJs } from "@alkaid/react";
import { genFormStyle } from "./styles";
import cls from "classnames";
import { AllLocales, AllSchemas } from "@alkaid/formily-antd";
// import './styles.less'

export const RootNode: DnFC<React.ComponentProps<typeof FormilyForm>> =
  observer((props) => {
    const prefix = usePrefix("designable-form");
    const { hashId, wrapSSR } = useCssInJs({ prefix, styleFun: genFormStyle });
    const form = useMemo(
      () =>
        createForm({
          designable: true,
        }),
      []
    );
    return wrapSSR(
      <div
      // style={{
      //   position: "relative",
      //   width: "1920px",
      //   height: "1080px",
      //   background: "red",
      //   zIndex: "999",
      // }}
      >
        <FormilyForm
          {...props}
          style={{
            ...props.style,
          }}
          className={cls(prefix, hashId)}
          form={form}
        >
          {props.children}
        </FormilyForm>
      </div>
    );
  });

RootNode.Behavior = createBehavior({
  name: "RootNode",
  selector: (node) => node.componentName === "RootNode",
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      propsSchema: {
        type: "object",
        properties: {
          ...(AllSchemas.FormLayout.properties as any),
          style: AllSchemas.CSSStyle,
        },
      },
      defaultProps: {
        labelCol: 6,
        wrapperCol: 12,
      },
    };
  },
  designerLocales: AllLocales.Form,
});

RootNode.Resource = createResource({
  title: { "zh-CN": "表单", "en-US": "RootNode" },
  icon: "FormLayoutSource",
  elements: [
    {
      componentName: "Field",
      props: {
        type: "object",
        "x-component": "RootNode",
      },
    },
  ],
});
