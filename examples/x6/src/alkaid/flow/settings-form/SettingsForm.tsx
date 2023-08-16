import React, {FC, useEffect, useMemo, useState} from "react";
import {useSelectedNode} from "../hooks";
import {observer} from "@formily/reactive-react";
import {useCssInJs} from "@alkaid/react";
import cls from "classnames";
import {TreeNode} from "@alkaid/core";
import {Form} from "@formily/antd-v5";
import {createForm, Form as FormInstance} from "@formily/core";
import {useLocales} from "@alkaid/react-settings-form";
import {SchemaField} from "./SchemaField";
import {genSettingsFormStyle} from "./styles";


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
    const selectedNode = useSelectedNode()
    console.log("-----")
    console.log(selectedNode)
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genSettingsFormStyle})

    const form = useMemo(() => createForm({
        initialValues: selectedTreeNode?.designerProps.defaultProps,
        values: selectedNode?.data.props,
        effects(form) {
            if (selectedTreeNode) {
                useLocales(selectedTreeNode)
            }
        }
    }), [selectedTreeNode])

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
                    </Form>
                </div>
            </div>
        </div>)}
    </>
})