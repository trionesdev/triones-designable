import {IDesignerComponents, TreeNode} from "../../core";
import React, {FC, Fragment} from "react";
import {observer} from "@formily/react";
import {DesignerComponentsContext, TreeNodeContext} from "../context";
import {useComponents, useDesigner, useTree} from "../hooks";

export type TreeNodeWidgetProps = {
    node: TreeNode
    children?: React.ReactNode
}

export const TreeNodeWidget: FC<TreeNodeWidgetProps> =
    observer((props: TreeNodeWidgetProps) => {
        const designer = useDesigner()
        const components = useComponents()
        const node = props.node
        const renderChildren = () => {
            if (node?.designerProps?.selfRenderChildren) return []
            return node?.children?.map((child) => {
                return <TreeNodeWidget key={child.id} node={child}/>
            })
        }
        const renderProps = (extendsProps: any = {}) => {
            const props = {
                ...node.designerProps?.defaultProps,
                ...extendsProps,
                ...node.props,
                ...node.designerProps?.getComponentProps?.(node),
            }
            if (node.depth === 0) {
                delete props.style
            }
            return props
        }

        const renderComponent = () => {
            const componentName = node.componentName
            const Component = components[componentName]
            const dataId: any = {}
            if (Component) {
                if (designer) {
                    dataId[designer?.props?.nodeIdAttrName!] = node.id
                }
                return React.createElement(
                    Component,
                    renderProps(dataId),
                    ...renderChildren()
                )
            } else {
                if (node?.children?.length) {
                    return <Fragment>{renderChildren()}</Fragment>
                }
            }
        }

        if (!node) return null
        if (node.hidden) return null
        return React.createElement(
            TreeNodeContext.Provider,
            {value: node},
            renderComponent()
        )
    })

export type ComponentTreeWidgetProps = {
    style?: React.CSSProperties
    className?: string
    components: IDesignerComponents
}

export const ComponentTreeWidget: FC<ComponentTreeWidgetProps> =
    observer((props: ComponentTreeWidgetProps) => {
        const tree = useTree()
        return <>
            <DesignerComponentsContext.Provider value={props.components}>
                <TreeNodeWidget node={tree} />
            </DesignerComponentsContext.Provider>
        </>
    })