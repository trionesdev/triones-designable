import React from 'react'
import {TreeNode} from '@trionesdev/designable-core'
import {usePrefix, useToken} from '../../hooks'
import {IconWidget} from '../IconWidget'
import {Button} from 'antd'
import cls from "classnames";

export interface ICopyProps {
    node: TreeNode
    style?: React.CSSProperties
}

export const Copy: React.FC<ICopyProps> = ({node, style}) => {
    const prefix = usePrefix('aux-copy')
    const {hashId} = useToken()
    if (node === node.root) return null
    return (
        <Button
            className={cls(prefix, hashId)}
            style={style}
            type="primary"
            onClick={() => {
                TreeNode.clone([node])
            }}
        >
            <IconWidget infer="Clone"/>
        </Button>
    )
}

Copy.displayName = 'Copy'
