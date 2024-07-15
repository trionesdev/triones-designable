import React from 'react';
import { TreeNode } from '@trionesdev/designable-core';
import { IconWidget } from '../IconWidget';
import { usePrefix, useToken } from '../../hooks';
import { Button } from 'antd';
import cls from 'classnames';

export interface IDeleteProps {
  node: TreeNode;
  style?: React.CSSProperties;
}

export const Delete: React.FC<IDeleteProps> = ({ node, style }) => {
  const prefix = usePrefix('aux-copy');
  const { hashId } = useToken();
  if (node === node.root) return null;
  return (
    <Button
      className={cls(prefix, hashId)}
      style={style}
      type="primary"
      onClick={() => {
        TreeNode.remove([node]);
      }}
    >
      <IconWidget infer="Remove" />
    </Button>
  );
};

Delete.displayName = 'Delete';
