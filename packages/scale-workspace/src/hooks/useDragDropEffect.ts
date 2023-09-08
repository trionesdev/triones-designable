import {
  Engine,
  ClosestPosition,
  CursorType,
  CursorDragType,
  TreeNode,
  ScreenType,
} from "@alkaid/core";
import {
  DragStartEvent,
  DragMoveEvent,
  DragStopEvent,
  ViewportScrollEvent,
} from "@alkaid/core";
import { Point } from "@alkaid/shared";

export const useDragDropEffect = (engine: Engine) => {
  engine.subscribeTo(DragStartEvent, (event) => {
    if (engine.cursor.type !== CursorType.Normal) return;
    const target = event.data.target as HTMLElement;
    const el = target?.closest(`
       *[${engine.props.nodeIdAttrName}],
       *[${engine.props.sourceIdAttrName}],
       *[${engine.props.outlineNodeIdAttrName}]
      `);
    const handler = target?.closest(
      `*[${engine.props.nodeDragHandlerAttrName}]`
    );
    const helper = handler?.closest(
      `*[${engine.props.nodeSelectionIdAttrName}]`
    );
    if (!el?.getAttribute && !handler) return;
    const sourceId = el?.getAttribute(engine.props.sourceIdAttrName);
    const outlineId = el?.getAttribute(engine.props.outlineNodeIdAttrName);
    const handlerId = helper?.getAttribute(
      engine.props.nodeSelectionIdAttrName
    );
    const nodeId = el?.getAttribute(engine.props.nodeIdAttrName);
    engine.workbench.eachWorkspace((currentWorkspace) => {
      const operation = currentWorkspace.operation;
      const moveHelper = operation.moveHelper;
      if (nodeId || outlineId || handlerId) {
        const node = engine.findNodeById(outlineId || nodeId || handlerId);
        if (node) {
          if (!node.allowDrag()) return;
          if (node === node.root) return;
          const validSelected = engine
            .getAllSelectedNodes()
            .filter((node) => node.allowDrag());
          if (validSelected.some((selectNode) => selectNode === node)) {
            moveHelper.dragStart({ dragNodes: TreeNode.sort(validSelected) });
          } else {
            moveHelper.dragStart({ dragNodes: [node] });
          }
        }
      } else if (sourceId) {
        const sourceNode = engine.findNodeById(sourceId);
        if (sourceNode) {
          moveHelper.dragStart({ dragNodes: [sourceNode] });
        }
      }
    });
    engine.cursor.setStyle("move");
  });

  engine.subscribeTo(DragMoveEvent, (event) => {
    if (engine.cursor.type !== CursorType.Normal) return;
    if (engine.cursor.dragType !== CursorDragType.Move) return;
    const target = event.data.target as HTMLElement;
    const el = target?.closest(`
      *[${engine.props.nodeIdAttrName}],
      *[${engine.props.outlineNodeIdAttrName}]
    `);
    const point = new Point(event.data.topClientX, event.data.topClientY);
    const nodeId = el?.getAttribute(engine.props.nodeIdAttrName);
    const outlineId = el?.getAttribute(engine.props.outlineNodeIdAttrName);
    engine.workbench.eachWorkspace((currentWorkspace) => {
      const operation = currentWorkspace.operation;
      const moveHelper = operation.moveHelper;
      const dragNodes = moveHelper.dragNodes;
      const tree = operation.tree;
      if (!dragNodes.length) return;
      const touchNode = tree.findById(outlineId || nodeId);
      moveHelper.dragMove({
        point,
        touchNode,
      });
    });
  });

  engine.subscribeTo(ViewportScrollEvent, (event) => {
    if (engine.cursor.type !== CursorType.Normal) return;
    if (engine.cursor.dragType !== CursorDragType.Move) return;
    const point = new Point(
      engine.cursor.position.topClientX,
      engine.cursor.position.topClientY
    );
    const currentWorkspace =
      event?.context?.workspace ?? engine.workbench.activeWorkspace;
    if (!currentWorkspace) return;
    const operation = currentWorkspace.operation;
    const moveHelper = operation.moveHelper;
    if (!moveHelper.dragNodes.length) return;
    const tree = operation.tree;
    const viewport = currentWorkspace.viewport;
    const outline = currentWorkspace.outline;
    const viewportTarget = viewport.elementFromPoint(point);
    const outlineTarget = outline.elementFromPoint(point);
    const viewportNodeElement = viewportTarget?.closest(`
      *[${engine.props.nodeIdAttrName}],
      *[${engine.props.outlineNodeIdAttrName}]
    `);
    const outlineNodeElement = outlineTarget?.closest(`
    *[${engine.props.nodeIdAttrName}],
    *[${engine.props.outlineNodeIdAttrName}]
  `);
    const nodeId = viewportNodeElement?.getAttribute(
      engine.props.nodeIdAttrName
    );
    const outlineNodeId = outlineNodeElement?.getAttribute(
      engine.props.outlineNodeIdAttrName
    );
    const touchNode = tree.findById(outlineNodeId || nodeId);
    moveHelper.dragMove({ point, touchNode });
  });

  engine.subscribeTo(DragStopEvent, (event) => {
    if (engine.cursor.type !== CursorType.Normal) return;
    if (engine.cursor.dragType !== CursorDragType.Move) return;

    engine.workbench.eachWorkspace((currentWorkspace) => {
      const operation = currentWorkspace.operation;
      const moveHelper = operation.moveHelper;
      const dragNodes = moveHelper.dragNodes;
      const closestNode = moveHelper.closestNode;
      const rootNode = moveHelper.rootNode;
      const closestDirection = moveHelper.closestDirection;
      const selection = operation.selection;
      if (!dragNodes.length) return;

      if (dragNodes.length && closestNode && closestDirection) {
        if (engine.screen.type === ScreenType.Scale) {
          //------------缩放画布特殊配置---------
          const mousePoint = new Point(
            event.data.topClientX,
            event.data.topClientY
          );
          const contentPoint = new Point(
            engine.screen?.contentRect?.x,
            engine.screen?.contentRect?.y
          );
          const scale = engine.screen.scale;
          const offsetLeft = (mousePoint.x - contentPoint.x) / scale;
          const offsetTop = (mousePoint.y - contentPoint.y) / scale;
          const node = TreeNode.filterDroppable(dragNodes, closestNode)[0];
          const componentProps =
            node.designerProps?.getComponentProps?.(node) ?? {};
          const myComponentProps = {
            "x-component-props": {
              style: {
                top: offsetTop,
                left: offsetLeft,
                position: "absolute",
              },
            },
          };
          Object.assign(componentProps, myComponentProps);
          node.setProps(componentProps);
          selection.batchSafeSelect(rootNode.append(node));
          moveHelper.dragDrop({ dropNode: rootNode });
          setTimeout(() => {
            //为了解决选择框不同步问题，结束操作异步一下
            moveHelper.dragEnd();
            engine.cursor.setStyle("");
          }, 100);
          return;
          //------------缩放画布特殊配置结束---------
        }
        if (
          closestDirection === ClosestPosition.After ||
          closestDirection === ClosestPosition.Under
        ) {
          if (closestNode.allowSibling(dragNodes)) {
            selection.batchSafeSelect(
              closestNode.insertAfter(
                ...TreeNode.filterDroppable(dragNodes, closestNode.parent)
              )
            );
          }
        } else if (
          closestDirection === ClosestPosition.Before ||
          closestDirection === ClosestPosition.Upper
        ) {
          if (closestNode.allowSibling(dragNodes)) {
            selection.batchSafeSelect(
              closestNode.insertBefore(
                ...TreeNode.filterDroppable(dragNodes, closestNode.parent)
              )
            );
          }
        } else if (
          closestDirection === ClosestPosition.Inner ||
          closestDirection === ClosestPosition.InnerAfter
        ) {
          if (closestNode.allowAppend(dragNodes)) {
            const node = TreeNode.filterDroppable(dragNodes, closestNode)[0];
            selection.batchSafeSelect(closestNode.append(node));
            moveHelper.dragDrop({ dropNode: closestNode });
          }
        } else if (closestDirection === ClosestPosition.InnerBefore) {
          if (closestNode.allowAppend(dragNodes)) {
            selection.batchSafeSelect(
              closestNode.prepend(
                ...TreeNode.filterDroppable(dragNodes, closestNode)
              )
            );
            moveHelper.dragDrop({ dropNode: closestNode });
          }
        }
      }
      moveHelper.dragEnd();
    });
    engine.cursor.setStyle("");
  });
};
