import React from 'react'
import {TreeNode} from '@trionesdev/designable-core'
import {observer} from '@formily/reactive-react'
import {useTreeNode, useNodeIdProps, useCssInJs} from '../../hooks'
import {NodeTitleWidget} from '../NodeTitleWidget'
import {
    NodeActionsWidget,
    INodeActionsWidgetActionProps,
} from '../NodeActionsWidget'
// import './styles.less'
import {genDroppableWidgetStyle} from "./styles";
import cls from "classnames";

export interface IDroppableWidgetProps {
    children?: React.ReactNode
    node?: TreeNode
    actions?: INodeActionsWidgetActionProps[]
    placeholder?: boolean
    height?: number
    style?: React.CSSProperties
    className?: string
    hasChildren?: boolean
}

export const DroppableWidget: React.FC<IDroppableWidgetProps> = observer(
    ({
         node,
         actions,
         height,
         placeholder,
         style,
         className,
         hasChildren: hasChildrenProp,
         ...props
     }) => {
        const {hashId, wrapSSR} = useCssInJs({styleFun: genDroppableWidgetStyle})
        const currentNode = useTreeNode()
        const nodeId = useNodeIdProps(node)
        const target = node ?? currentNode
        const hasChildren = hasChildrenProp ?? target.children?.length > 0
        return wrapSSR(
            <div {...nodeId} {...props} className={className} style={style}>
                {hasChildren ? (
                    props.children
                ) : placeholder ? (
                    <div style={{height}} className={cls("dn-droppable-placeholder", hashId)}>
                        <NodeTitleWidget node={target}/>
                    </div>
                ) : (
                    props.children
                )}
                {actions?.length ? (
                    <NodeActionsWidget>
                        {actions.map((action, key) => (
                            <NodeActionsWidget.Action {...action} key={key}/>
                        ))}
                    </NodeActionsWidget>
                ) : null}
            </div>
        )
    }
)

DroppableWidget.defaultProps = {
    placeholder: true,
}
