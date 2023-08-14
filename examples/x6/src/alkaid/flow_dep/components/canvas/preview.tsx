import {DnFC} from "@alkaid/react";
import {createBehavior, createResource} from "@alkaid/core";
import {FlowLocales} from "../locals";

export const Canvas:DnFC = () => {
  return <></>
}
Canvas.Behavior = createBehavior({
  name: 'Canvas',
  selector: (node) => node.componentName === 'Canvas',
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      propsSchema: {
        type: 'object',
      },
    }
  },
  designerLocales: FlowLocales.Canvas,
})

Canvas.Resource = createResource({
  title: {'zh-CN': '画布', 'en-US': 'Canvas'},
  icon: 'FormLayoutSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
        'x-component': 'Canvas',
      },
    },
  ],
})