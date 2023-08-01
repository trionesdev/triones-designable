import {IDesignerComponents, TreeNode} from "../../core";
import React, {FC} from "react";
import {observer} from "@formily/react";
import {DesignerComponentsContext} from "../context";

export type TreeNodeWidgetProps ={
    node: TreeNode
    children?: React.ReactNode
}

export const TreeNodeWidget:FC<TreeNodeWidgetProps> =
    observer((props: TreeNodeWidgetProps)=>{
        return <></>
    })

export type ComponentTreeWidgetProps = {
    style?: React.CSSProperties
    className?: string
    components: IDesignerComponents
}

export const ComponentTreeWidget: FC<ComponentTreeWidgetProps> =
    observer((props: ComponentTreeWidgetProps) => {

        return <>
            <DesignerComponentsContext.Provider value={props.components}>

            </DesignerComponentsContext.Provider>
        </>
    })