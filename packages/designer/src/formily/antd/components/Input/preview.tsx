import { Input as FormilyInput } from '@formily/antd-v5'
import {createBehavior, createResource, DnFC} from "../../../../core";
import React from "react";
import {Schemas} from "../../schemas";
import {Locales} from "../../locales";

export const Input: DnFC<React.ComponentProps<typeof FormilyInput>> = FormilyInput

Input.Behavior = createBehavior(
    {
        name: 'Input',
        extends: ['Field'],
        selector: (node:any) => node.props['x-component'] === 'Input',
        designerProps: {
            // propsSchema: createFieldSchema(Schemas.Input),
        },
        designerLocales: Locales.Input,
    },
    {
        name: 'Input.TextArea',
        extends: ['Field'],
        selector: (node:any) => node.props['x-component'] === 'Input.TextArea',
        designerProps: {
            // propsSchema: createFieldSchema(AllSchemas.Input.TextArea),
        },
        // designerLocales: Locales.TextArea,
    }
)

Input.Resource = createResource(
    {
        icon: 'InputSource',
        elements: [
            {
                componentName: 'Field',
                props: {
                    type: 'string',
                    title: 'Input',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                },
            },
        ],
    },
    {
        icon: 'TextAreaSource',
        elements: [
            {
                componentName: 'Field',
                props: {
                    type: 'string',
                    title: 'TextArea',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input.TextArea',
                },
            },
        ],
    }
)