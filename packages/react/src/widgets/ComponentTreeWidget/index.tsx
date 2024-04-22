import React, { Fragment, useEffect } from 'react';
import {
  useTree,
  usePrefix,
  useDesigner,
  useComponents,
  useCssInJs,
} from '../../hooks';
import { TreeNodeContext, DesignerComponentsContext } from '../../context';
import { IDesignerComponents } from '../../types';
import { TreeNode, GlobalRegistry } from '@trionesdev/designable-core';
import { observer } from '@formily/reactive-react';
import cls from 'classnames';
// import './styles.less'
import { genComponentTreeWidgetStyle } from './styles';

export interface IComponentTreeWidgetProps {
  style?: React.CSSProperties;
  className?: string;
  components: IDesignerComponents;
}

export interface ITreeNodeWidgetProps {
  node: TreeNode;
  children?: React.ReactNode;
}

export const TreeNodeWidget: React.FC<ITreeNodeWidgetProps> = observer(
  (props: ITreeNodeWidgetProps) => {
    const designer = useDesigner(props.node?.designerProps?.effects);
    const components = useComponents();
    const node = props.node;
    const renderChildren = () => {
      if (node?.designerProps?.selfRenderChildren) return [];
      return node?.children?.map((child) => {
        return <TreeNodeWidget key={child.id} node={child} />;
      });
    };
    const renderProps = (extendsProps: any = {}) => {
      const props = {
        ...node.designerProps?.defaultProps,
        ...extendsProps,
        ...node.props,
        ...node.designerProps?.getComponentProps?.(node),
      };
      if (node.depth === 0) {
        delete props.style;
      }
      return props;
    };
    const renderComponent = () => {
      const componentName = node.componentName;
      const Component = components[componentName];
      const dataId = {};
      if (Component) {
        if (designer) {
          dataId[designer?.props?.nodeIdAttrName] = node.id;
        }
        return React.createElement(
          Component,
          renderProps(dataId),
          ...renderChildren(),
        );
      } else {
        if (node?.children?.length) {
          return <Fragment>{renderChildren()}</Fragment>;
        }
      }
    };

    if (!node) return null;
    if (node.hidden) return null;

    return React.createElement(
      TreeNodeContext.Provider,
      { value: node },
      renderComponent(),
    );
  },
);

export const ComponentTreeWidget: React.FC<IComponentTreeWidgetProps> =
  observer((props: IComponentTreeWidgetProps) => {
    const tree = useTree();
    const prefix = usePrefix('component-tree');
    const { hashId, wrapSSR } = useCssInJs({
      prefix,
      styleFun: genComponentTreeWidgetStyle,
    });
    const designer = useDesigner();
    const dataId = {};
    if (designer && tree) {
      dataId[designer?.props?.nodeIdAttrName] = tree.id;
    }

    useEffect(() => {
      GlobalRegistry.registerDesignerBehaviors(props.components);
    }, []);
    return wrapSSR(
      <div
        style={{ ...props.style, ...tree?.props?.style }}
        className={cls(prefix, props.className, hashId)}
        {...dataId}
      >
        <DesignerComponentsContext.Provider value={props.components}>
          <TreeNodeWidget node={tree} />
        </DesignerComponentsContext.Provider>
      </div>,
    );
  });

ComponentTreeWidget.displayName = 'ComponentTreeWidget';
