import React, {FC, useEffect, useState} from "react";
import {useTree, useWorkbench} from "../hooks";
import {ITreeNode, TreeNode, WorkbenchTypes} from "../../core";
import {requestIdle} from "../../shared";
import {Viewport} from "../containers";

type ViewPanelPros = {
    type: WorkbenchTypes
    children: (
        tree: TreeNode,
        onChange: (tree: ITreeNode) => void
    ) => React.ReactElement
    scrollable?: boolean
    dragTipsDirection?: 'left' | 'right'
}
export const ViewPanel: FC<ViewPanelPros> = ({
                                                 children,
    ...props
                                             }) => {
    const [visible, setVisible] = useState(true)
    const workbench = useWorkbench()
    const tree = useTree()

    useEffect(() => {
        if (workbench.type === props.type) {
            requestIdle(() => {
                requestAnimationFrame(() => {
                    setVisible(true)
                })
            })
        } else {
            setVisible(false)
        }
    }, [workbench.type])

    if (workbench.type !== props.type) return null
    const render = () => {
        return children(tree, (payload) => {
            tree.from(payload)
            tree.takeSnapshot()
        })
    }


    if (workbench.type === 'DESIGNABLE')
        return (
            <Viewport dragTipsDirection={props.dragTipsDirection}>
                {render()}
            </Viewport>
        )
}