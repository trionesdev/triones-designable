import React from 'react';
import { Space, Typography, Divider, TypographyProps } from 'antd';
import { observer } from '@formily/reactive-react';
import {
  usePrefix,
  useTreeNode,
  useSelected,
  useCssInJs,
  useToken,
} from '../../hooks';
import { IconWidget } from '../IconWidget';
import { TextWidget } from '../TextWidget';
import cls from 'classnames';
import { genNodeActionsWidgetStyle } from './styles';

// import './styles.less'

export interface INodeActionsWidgetProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  activeShown?: boolean;
}

export interface INodeActionsWidgetActionProps
  extends Omit<React.ComponentProps<'a'>, 'title' | 'type' | 'ref'>,
    Partial<TypographyProps['Link']> {
  className?: string;
  style?: React.CSSProperties;
  title: React.ReactNode;
  icon?: React.ReactNode;
}

export const NodeActionsWidget: React.FC<INodeActionsWidgetProps> & {
  Action?: React.FC<INodeActionsWidgetActionProps>;
} = observer((props) => {
  const node = useTreeNode();
  const prefix = usePrefix('node-actions');
  const { hashId, wrapSSR } = useCssInJs({
    prefix,
    styleFun: genNodeActionsWidgetStyle,
  });
  const selected = useSelected();
  if (selected.indexOf(node.id) === -1 && props.activeShown) return null;
  return wrapSSR(
    <div className={cls(prefix, props.className, hashId)} style={props.style}>
      <div className={cls(prefix + '-content', hashId)}>
        <Space split={<Divider type="vertical" />}>{props.children}</Space>
      </div>
    </div>,
  );
});

const NodeActionsWidgetAction = ({ icon, title, ...props }) => {
  const prefix = usePrefix('node-actions-item');
  const { hashId } = useToken();
  return (
    <Typography.Link
      {...props}
      className={cls(props.className, prefix, hashId)}
      data-click-stop-propagation="true"
    >
      <span className={prefix + '-text'}>
        <IconWidget infer={icon} />
        <TextWidget>{title}</TextWidget>
      </span>
    </Typography.Link>
  );
};
NodeActionsWidget.Action = NodeActionsWidgetAction;
