import {GlobalRegistry, IDesignerComponents, TreeNode} from "../../core";
import React, {FC, forwardRef, Fragment, useEffect} from "react";
import {observer} from "@formily/react";
import {DesignerComponentsContext, TreeNodeContext} from "../context";
import {useComponents, useDesigner, useTree} from "../hooks";
import {GlobalToken, theme} from "antd";
import {CSSInterpolation, useStyleRegister} from "@ant-design/cssinjs";
import classNames from "classnames";
import {DragPreviewImage, useDrag, useDrop} from "react-dnd";

const {useToken} = theme;

export type TreeNodeWidgetProps = {
    node: TreeNode
    children?: React.ReactNode
}

export const TreeNodeWidget: FC<TreeNodeWidgetProps> =
    observer((props: TreeNodeWidgetProps) => {

        const [{opacity}, drag, preview] = useDrag(() => ({
            type: 'component',
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            }),
        }))

        debugger
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
                return <>
                    {/*<DragPreviewImage connect={preview} src={<></>} />*/}
                    {React.createElement(
                        Component,
                        Object.assign(renderProps(dataId), {ref: drag}),
                        ...renderChildren()
                    )}
                </>
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


const genComponentTreeStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            height: '100%'
        }
    };
};

export type ComponentTreeWidgetProps = {
    style?: React.CSSProperties
    className?: string
    components: IDesignerComponents
}

export const ComponentTreeWidget: FC<ComponentTreeWidgetProps> =
    observer((props: ComponentTreeWidgetProps) => {
        const tree = useTree()

        // const [{canDrop, isOver}, drop] = useDrop(() => ({
        //     accept: 'component',
        //     drop: (item: any, monitor) => {
        //         debugger
        //         tree.children.push(item.source.node)
        //     },
        //     collect: (monitor) => ({
        //         isOver: monitor.isOver(),
        //         canDrop: monitor.canDrop(),
        //     }),
        // }))


        console.log(tree)
        useEffect(() => {
            GlobalRegistry.registerDesignerBehaviors(props.components)
        }, [])

        const prefixCls = 'alkaid-component-tree';
        const {theme, token, hashId} = useToken();
        const wrapSSR = useStyleRegister(
            {theme, token, hashId, path: [prefixCls]},
            () => [genComponentTreeStyle(prefixCls, token)],
        );

        return wrapSSR(
            <div className={classNames(prefixCls, hashId)}>
                <DesignerComponentsContext.Provider value={props.components}>
                    <TreeNodeWidget node={tree}/>
                </DesignerComponentsContext.Provider>
            </div>
        )
    })