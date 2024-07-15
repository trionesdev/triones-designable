import React, { useRef, useContext, useEffect } from 'react';
import {
  TreeNode,
  ClosestPosition,
  CursorStatus,
  DragMoveEvent,
} from '@trionesdev/designable-core';
import { isFn } from '@trionesdev/designable-shared';
import { autorun } from '@formily/reactive';
import { observer } from '@formily/reactive-react';
import {
  usePrefix,
  useCursor,
  useSelection,
  useMoveHelper,
  useDesigner,
  useToken,
} from '../../hooks';
import { IconWidget } from '../IconWidget';
import { NodeTitleWidget } from '../NodeTitleWidget';
import { NodeContext } from './context';
import cls from 'classnames';
// import './styles.less'
export interface IOutlineTreeNodeProps {
  node: TreeNode;
  style?: React.CSSProperties;
  className?: string;
  workspaceId?: string;
}

export const OutlineTreeNode: React.FC<IOutlineTreeNodeProps> = observer(
  ({ node, className, style, workspaceId }) => {
    const prefix = usePrefix('outline-tree-node');
    const { hashId } = useToken();
    const engine = useDesigner();
    const ref = useRef<HTMLDivElement>();
    const ctx = useContext(NodeContext);
    const request = useRef(null);
    const cursor = useCursor();
    const selection = useSelection(workspaceId);
    const moveHelper = useMoveHelper(workspaceId);

    useEffect(() => {
      return engine.subscribeTo(DragMoveEvent, () => {
        const closestNodeId = moveHelper?.closestNode?.id;
        const closestDirection = moveHelper?.outlineClosestDirection;
        const id = node.id;
        if (!ref.current) return;
        if (
          closestNodeId === id &&
          closestDirection === ClosestPosition.Inner
        ) {
          if (!ref.current.classList.contains('droppable')) {
            ref.current.classList.add('droppable');
          }
          if (!ref.current.classList.contains('expanded')) {
            if (request.current) {
              clearTimeout(request.current);
              request.current = null;
            }
            request.current = setTimeout(() => {
              ref.current.classList.add('expanded');
            }, 600);
          }
        } else {
          if (request.current) {
            clearTimeout(request.current);
            request.current = null;
          }
          if (ref.current.classList.contains('droppable')) {
            ref.current.classList.remove('droppable');
          }
        }
      });
    }, [node, moveHelper, cursor]);

    useEffect(() => {
      return autorun(() => {
        const selectedIds = selection?.selected || [];
        const id = node.id;
        if (!ref.current) return;
        if (selectedIds.includes(id)) {
          if (!ref.current.classList.contains('selected')) {
            ref.current.classList.add('selected');
          }
        } else {
          if (ref.current.classList.contains('selected')) {
            ref.current.classList.remove('selected');
          }
        }
        if (
          cursor.status === CursorStatus.Dragging &&
          moveHelper?.dragNodes?.length
        ) {
          if (ref.current.classList.contains('selected')) {
            ref.current.classList.remove('selected');
          }
        }
      });
    }, [node, selection, moveHelper]);

    if (!node) return null;

    const renderIcon = (node: TreeNode) => {
      const icon = node.designerProps.icon;
      if (icon) {
        return <IconWidget infer={icon} size={12} />;
      }
      if (node === node?.root) {
        return <IconWidget infer="Page" size={12} />;
      } else if (node.designerProps?.droppable) {
        return <IconWidget infer="Container" size={12} />;
      }
      return <IconWidget infer="Component" size={12} />;
    };

    const renderTitle = (node: TreeNode) => {
      if (isFn(ctx.renderTitle)) return ctx.renderTitle(node);
      return (
        <span>
          <NodeTitleWidget node={node} />
        </span>
      );
    };

    const renderActions = (node: TreeNode) => {
      if (isFn(ctx.renderActions)) return ctx.renderActions(node);
    };

    return (
      <div
        style={style}
        ref={ref}
        className={cls(prefix, className, 'expanded', hashId)}
        data-designer-outline-node-id={node.id}
      >
        <div className={cls(prefix + '-header', hashId)}>
          <div
            className={cls(prefix + '-header-head', hashId)}
            style={{
              left: -node.depth * 16,
              width: node.depth * 16,
            }}
          ></div>
          <div className={cls(prefix + '-header-content', hashId)}>
            <div className={cls(prefix + '-header-base', hashId)}>
              {(node?.children?.length > 0 || node === node.root) && (
                <div
                  className={cls(prefix + '-expand', hashId)}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (ref.current?.classList?.contains('expanded')) {
                      ref.current?.classList.remove('expanded');
                    } else {
                      ref.current?.classList.add('expanded');
                    }
                  }}
                >
                  <IconWidget infer="Expand" size={10} />
                </div>
              )}
              <div className={cls(prefix + '-icon', hashId)}>
                {renderIcon(node)}
              </div>
              <div className={cls(prefix + '-title', hashId)}>
                {renderTitle(node)}
              </div>
            </div>
            <div
              className={cls(prefix + '-header-actions', hashId)}
              data-click-stop-propagation
            >
              {renderActions(node)}
              {node !== node.root && (
                <IconWidget
                  className={cls(
                    prefix + '-hidden-icon',
                    {
                      hidden: node.hidden,
                    },
                    hashId,
                  )}
                  infer={node.hidden ? 'EyeClose' : 'Eye'}
                  size={14}
                  onClick={() => {
                    node.hidden = !node.hidden;
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className={cls(prefix + '-children', hashId)}>
          {node.children?.map((child) => {
            return (
              <OutlineTreeNode
                node={child}
                key={child.id}
                workspaceId={workspaceId}
              />
            );
          })}
        </div>
      </div>
    );
  },
);
