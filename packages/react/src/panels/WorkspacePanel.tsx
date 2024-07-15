import React from 'react';
import { useCssInJs, usePrefix } from '../hooks';
import { genWorkspacePanelStyle } from './styles';
import cls from 'classnames';
import { theme } from 'antd';
const { useToken } = theme;

export interface IWorkspaceItemProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  flexable?: boolean;
}

export const WorkspacePanel: React.FC<{ children?: React.ReactNode }> & {
  Item?: React.FC<IWorkspaceItemProps>;
} = (props) => {
  const prefix = usePrefix('workspace-panel');
  const { hashId, wrapSSR } = useCssInJs({
    prefix,
    styleFun: genWorkspacePanelStyle,
  });
  return wrapSSR(<div className={cls(prefix, hashId)}>{props.children}</div>);
};
const WorkspacePanelItem = (props) => {
  const prefix = usePrefix('workspace-panel-item');
  const { hashId } = useToken();
  return (
    <div
      className={cls(prefix, hashId)}
      style={{
        ...props.style,
        flexGrow: props.flexable ? 1 : 0,
        flexShrink: props.flexable ? 1 : 0,
      }}
    >
      {props.children}
    </div>
  );
};
WorkspacePanel.Item = WorkspacePanelItem;
