import React, { useRef, useState, useLayoutEffect } from 'react';
import { TreeNode } from '@trionesdev/designable-core';
import { reaction } from '@formily/reactive';
import { usePrefix, useToken, useViewport } from '../../hooks';
import { Selector } from './Selector';
import { Copy } from './Copy';
import { Delete } from './Delete';
import { DragHandler } from './DragHandler';
import cls from 'classnames';
import { Rect } from '@trionesdev/designable-shared';

const HELPER_DEBOUNCE_TIMEOUT = 100;

export interface IHelpersProps {
  node: TreeNode;
  nodeRect: Rect;
}

export interface IViewportState {
  viewportWidth?: number;
  viewportHeight?: number;
  viewportScrollX?: number;
  viewportScrollY?: number;
  viewportIsScrollTop?: boolean;
  viewportIsScrollBottom?: boolean;
}

export const Helpers: React.FC<IHelpersProps> = ({ node, nodeRect }) => {
  const prefix = usePrefix('aux-helpers');
  const { hashId } = useToken();
  const viewport = useViewport();
  const unmountRef = useRef(false);
  const ref = useRef<HTMLDivElement>();
  const [position, setPosition] = useState('top-right');

  useLayoutEffect(() => {
    let request = null;

    const getYInViewport = (nodeRect: Rect, helpersRect: Rect) => {
      if (nodeRect.top - viewport.scrollY > helpersRect.height) {
        return 'top';
      } else if (
        viewport.isScrollTop &&
        nodeRect.height + helpersRect.height > viewport.height
      ) {
        return 'inner-top';
      } else if (
        nodeRect.bottom >= viewport.scrollY + viewport.height &&
        nodeRect.height + helpersRect.height > viewport.height
      ) {
        return 'inner-bottom';
      }

      return 'bottom';
    };

    const getXInViewport = (nodeRect: Rect, helpersRect: Rect) => {
      const widthDelta = helpersRect.width - nodeRect.width;
      if (widthDelta >= 0) {
        if (nodeRect.x < widthDelta) {
          return 'left';
        } else if (nodeRect.right + widthDelta > viewport.width) {
          return 'right';
        } else {
          return 'center';
        }
      }
      return 'right';
    };

    const update = () => {
      const helpersRect = ref.current?.getBoundingClientRect();
      if (!helpersRect || !nodeRect) return;
      if (unmountRef.current) return;
      setPosition(
        getYInViewport(nodeRect, helpersRect) +
          '-' +
          getXInViewport(nodeRect, helpersRect),
      );
    };

    update();

    return reaction(
      () => [
        viewport.width,
        viewport.height,
        viewport.scrollX,
        viewport.scrollY,
        viewport.isScrollBottom,
        viewport.isScrollTop,
      ],
      () => {
        clearTimeout(request);
        request = setTimeout(update, HELPER_DEBOUNCE_TIMEOUT);
      },
    );
  }, [viewport, nodeRect]);

  if (!nodeRect || !node) return null;

  return (
    <div
      className={cls(
        prefix,
        {
          [position]: true,
        },
        hashId,
      )}
      ref={ref}
    >
      <div className={cls(prefix + '-content', hashId)}>
        <Selector node={node} />
        {node?.allowClone() === false ? null : <Copy node={node} />}
        {node?.allowDrag() === false ? null : <DragHandler node={node} />}
        {node?.allowDelete() === false ? null : <Delete node={node} />}
      </div>
    </div>
  );
};

Helpers.displayName = 'Helpers';
