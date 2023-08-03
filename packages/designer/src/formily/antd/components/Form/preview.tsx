import {createBehavior, createResource, DnFC} from "../../../../core";
import { Form as FormilyForm } from '@formily/antd-v5'
import {Locales} from "../../locales";
import {Schemas} from "../../schemas";
import {observer} from "@formily/react";
import {useMemo} from "react";
import {createForm} from "@formily/core";
import React from "react";

export const Form: DnFC<React.ComponentProps<typeof FormilyForm>> = observer(
    (props) => {
        const form = useMemo(
            () =>
                createForm({
                    designable: true,
                }),
            []
        )
        return (
            <FormilyForm
                {...props}
                style={{ ...props.style }}
                form={form}
            >
                {props.children}
            </FormilyForm>
        )
    }
)

Form.Behavior = createBehavior({
    name: 'Form',
    selector: (node:any) => node.componentName === 'Form',
    designerProps(node:any) {
        return {
            draggable: !node.isRoot,
            cloneable: !node.isRoot,
            deletable: !node.isRoot,
            droppable: true,
            propsSchema: {
                type: 'object',
                properties: {
                    // ...(Schemas.FormLayout.properties as any),
                    // style: Schemas.CSSStyle,
                },
            },
            defaultProps: {
                labelCol: 6,
                wrapperCol: 12,
            },
        }
    },
    // designerLocales: Locales.Form,
})

Form.Resource = createResource({
    title: { 'zh-CN': '表单', 'en-US': 'Form' },
    icon: 'FormLayoutSource',
    elements: [
        {
            componentName: 'Field',
            props: {
                type: 'object',
                'x-component': 'Form',
            },
        },
    ],
})
