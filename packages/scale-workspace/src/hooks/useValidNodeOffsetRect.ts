import { useState, useEffect, useMemo, useCallback } from "react";
import {
  TreeNode,
  CursorStatus,
  CursorDragType,
  ScreenType,
} from "@alkaid/core";
import { LayoutObserver, Rect } from "@alkaid/shared";
import { useScreen, useDesigner, useViewport } from "@alkaid/react";

const isEqualRect = (rect1: Rect, rect2: Rect) => {
  return (
    rect1?.x === rect2?.x &&
    rect1?.y === rect2?.y &&
    rect1?.width === rect2?.width &&
    rect1?.height === rect2?.height
  );
};

export const useValidNodeOffsetRect = (node: TreeNode) => {
  const engine = useDesigner();
  const viewport = useViewport();
  const { type, scale } = useScreen(); //为了解决缩放页面rect数据读取不准确问题
  const [, forceUpdate] = useState(null);
  const rectRef = useMemo(() => {
    const DOMRect = viewport.getValidNodeOffsetRect(node);
    const newScale = type === ScreenType.Scale ? scale : 1;
    if (DOMRect) {
      DOMRect.width = DOMRect.width / newScale;
      DOMRect.height = DOMRect.height / newScale;
      DOMRect.x = DOMRect.x / newScale;
      DOMRect.y = DOMRect.y / newScale;
    }
    return { current: DOMRect };
  }, [node, scale, type, viewport]);

  const element = viewport.findElementById(node?.id);

  const compute = useCallback(() => {
    if (
      engine.cursor.status !== CursorStatus.Normal &&
      engine.cursor.dragType === CursorDragType.Move
    )
      return;
    const nextRect = viewport.getValidNodeOffsetRect(node);
    const newScale = type === ScreenType.Scale ? scale : 1;
    nextRect.width = nextRect.width / newScale;
    nextRect.height = nextRect.height / newScale;
    nextRect.x = nextRect.x / newScale;
    nextRect.y = nextRect.y / newScale;
    if (!isEqualRect(rectRef.current, nextRect) && nextRect) {
      rectRef.current = nextRect;
      forceUpdate([]);
    }
  }, [
    engine.cursor.status,
    engine.cursor.dragType,
    viewport,
    node,
    type,
    scale,
    rectRef,
  ]);

  useEffect(() => {
    const layoutObserver = new LayoutObserver(compute);
    if (element) layoutObserver.observe(element);
    return () => {
      layoutObserver.disconnect();
    };
  }, [node, viewport, element, type, scale, compute]);
  return rectRef.current;
};
