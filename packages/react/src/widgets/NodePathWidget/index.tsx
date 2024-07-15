import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import {
  useSelectedNode,
  useSelection,
  usePrefix,
  useHover,
  useCssInJs,
} from '../../hooks';
import { IconWidget } from '../IconWidget';
import { NodeTitleWidget } from '../NodeTitleWidget';
import { observer } from '@formily/reactive-react';
import { genNodePathWidgetStyle } from './styles';
import cls from 'classnames';

// import './styles.less'

export interface INodePathWidgetProps {
  workspaceId?: string;
  maxItems?: number;
}

export const NodePathWidget: React.FC<INodePathWidgetProps> = observer(
  (props) => {
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);
    const selected = useSelectedNode(props.workspaceId);
    const selection = useSelection(props.workspaceId);
    const hover = useHover(props.workspaceId);
    const prefix = usePrefix('node-path');
    const { hashId, wrapSSR } = useCssInJs({
      prefix,
      styleFun: genNodePathWidgetStyle,
    });
    if (!selected) return <React.Fragment />;
    const maxItems = props.maxItems ?? 3;

    useEffect(() => {
      const nodes = selected
        .getParents()
        .slice(0, maxItems - 1)
        .reverse()
        .concat(selected);
      let items = nodes.map((node, key) => {
        return {
          title: (
            <>
              {key === 0 && (
                <IconWidget infer="Position" style={{ marginRight: 3 }} />
              )}
              <a
                href=""
                onMouseEnter={() => {
                  hover.setHover(node);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  selection.select(node);
                }}
              >
                <NodeTitleWidget node={node} />
              </a>
            </>
          ),
        };
      });
      setBreadcrumbItems(items);
    }, [selected]);

    return wrapSSR(
      <Breadcrumb className={cls(prefix, hashId)} items={breadcrumbItems} />,
    );
  },
);
