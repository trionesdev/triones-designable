import React, {FC, useEffect, useMemo, useState} from "react";
import {useFlowViewport, useSelectedNode} from "../hooks";
import {observer} from "@formily/reactive-react";
import {useCssInJs} from "@alkaid/react";
import cls from "classnames";
import {TreeNode} from "@alkaid/core";
import {Form} from "@formily/antd-v5";
import {createForm, Form as FormInstance, onFieldInputValueChange} from "@formily/core";
import {useLocales} from "@alkaid/react-settings-form";
import {SchemaField} from "./SchemaField";
import {genSettingsFormStyle} from "./styles";
// import {cancelIdle, requestIdle} from "@alkaid/shared";
import _ from "lodash";
import {Button} from "antd";
import {uid} from "@alkaid/shared";

let timeRequest = null

// const GlobalState = {
//     idleRequest: null,
// }

type SettingsFormPanelProps = {
    className?: string
    style?: React.CSSProperties
    uploadAction?: string
    components?: Record<string, React.FC<any>>
    effects?: (form: FormInstance) => void
    scope?: any
}
export const SettingsForm: FC<SettingsFormPanelProps> = observer((props) => {
    const [selectedTreeNode, setSelectedTreeNode] = useState<TreeNode>()
    const schema = selectedTreeNode?.designerProps.propsSchema
    const prefix = "af-settings-form"
    const viewport = useFlowViewport()
    const selectedNode = useSelectedNode()
    console.log("-----")
    console.log(selectedNode)
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genSettingsFormStyle})

    const form = useMemo(() => createForm({
        initialValues: {"x-component-props": selectedTreeNode?.designerProps.defaultProps},
        values: {"x-component-props": selectedNode?.data.props},
        effects(form) {
            if (selectedTreeNode) {
                useLocales(selectedTreeNode)
                onFieldInputValueChange('*', () => {
                    clearTimeout(timeRequest)
                    timeRequest = setTimeout(() => {
                        let cell = viewport.graph.getCellById(viewport.selectedNode.id)
                        cell.setData({...cell.getData(), props: {"title": uid()}})
                        // form.submit((values) => {
                        //     console.log(values)
                        //     console.log(viewport.graph.getCells())

                        //
                        // })
                        form.submit().then((values) => {
                            console.log(values)
                            const cell = viewport.graph.getCellById(selectedNode.id)
                            if (cell.isNode()) {
                                const newData = _.assign({}, cell.getData(), {props: _.merge(cell.getData().props, _.get(values, 'x-component-props'))})
                                cell?.setData(newData)
                            }
                        })
                        debugger
                        console.log(selectedNode)
                    }, 500)
                })
                props.effects?.(form)
            }
        }
    }), [selectedTreeNode, selectedNode, viewport.graph])

    const handleSubmit = () => {
        // form.submit((values) => {
        //     console.log(values)
        //     console.log(viewport.graph.getCells())
        //     const cell = viewport.graph.getCellById(selectedNode.id)
        //     if (cell.isNode()) {
        //         const newData = _.assign({}, cell.getData(), {x:100,props: _.merge(cell.getData().props, _.get(values, 'x-component-props'))})
        //         cell?.setData(newData)
        //     }
        //
        // })
        form.submit().then((values) => {
            console.log(values)
            const cell = viewport.graph.getCellById(viewport.selectedNode.id)
            cell.setData({...cell.getData(), props: {"title": uid()}})
        })
    }

    // const handleTest = () => {
    //
    //     let cell = viewport.graph.getCellById(viewport.selectedNode.id)
    //     cell.setData({...cell.getData(),props:{"title":uid()}})
    // }

    useEffect(() => {
        if (selectedNode) {
            setSelectedTreeNode(new TreeNode({
                id: selectedNode.id,
                componentName: 'Field',
                props: {'type': 'object', 'x-component': selectedNode.shape}
            }))
        }
    }, [selectedNode])

    return <>
        <Button onClick={handleSubmit}>ss</Button>
        {selectedNode && wrapSSR(<div className={cls(prefix + '-wrapper', hashId)}>
            <div className={cls(prefix + '-content', hashId)}>
                <div
                    className={cls(prefix, props.className, hashId)}
                    style={props.style}
                    key={selectedNode.id}
                >
                    <Form
                        form={form}
                        colon={false}
                        labelWidth={120}
                        labelAlign="left"
                        wrapperAlign="right"
                        feedbackLayout="none"
                        tooltipLayout="text"
                    >
                        <SchemaField
                            schema={schema}
                            components={props.components}
                            scope={{$node: selectedTreeNode, ...props.scope}}
                        />
                        <Button onClick={handleSubmit}>sss</Button>
                    </Form>
                </div>
            </div>
        </div>)}
    </>
})