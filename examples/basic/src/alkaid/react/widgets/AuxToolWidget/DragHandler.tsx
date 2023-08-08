import React from 'react'
import {TreeNode} from '@alkaid/core'
import {observer} from '@formily/reactive-react'
import {IconWidget} from '../IconWidget'
import {useDesigner, usePrefix, useToken} from '../../hooks'
import {Button} from 'antd'
import cls from "classnames";

export interface IDragHandlerProps {
    node: TreeNode
    style?: React.CSSProperties
}

export const DragHandler: React.FC<IDragHandlerProps> = observer(
    ({node, style}) => {
        const designer = useDesigner()
        const prefix = usePrefix('aux-drag-handler')
        const {hashId} = useToken()
        if (node === node.root || !node.allowDrag()) return null
        const handlerProps = {
            [designer.props.nodeDragHandlerAttrName]: 'true',
        }
        return (
            <Button {...handlerProps} className={cls(prefix, hashId)} style={style} type="primary">
                <IconWidget infer="Move"/>
            </Button>
        )
    }
)

DragHandler.displayName = 'DragHandler'
