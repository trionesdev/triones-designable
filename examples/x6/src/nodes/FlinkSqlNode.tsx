import {DnFC} from "@alkaid/react";
import {BaseNode} from "./BaseNode";
import {createBehavior, createResource} from "@alkaid/core";
import React from "react";
import {uid} from "@alkaid/shared";

export const FlinkSqlNode: DnFC<React.ComponentProps<typeof BaseNode>> = BaseNode


FlinkSqlNode.Behavior = createBehavior({
    name: 'FlinkSqlNode',
    extends: ['FlowNode'],
    selector: (node) => node.props['x-component'] === 'FlinkSqlNode',
    designerProps: {
        propsSchema: {
            type: 'object',
            properties: {
                'node-props-group': {
                    type: 'void',
                    'x-component': 'CollapseItem',
                    properties: {
                        'x-component-props': {
                            type: 'object',
                            properties: {
                                title: {
                                    type: 'string',
                                    'x-decorator': 'FormItem',
                                    'x-component': 'Input',
                                }
                            }
                        }
                    }
                }
            },
        },
        defaultProps: {
            "title": "Flink Sql"
        },
        graphNodeProps: {
            data: {
                label: 'Flink Sql',
                icon: 'TextAreaSource',
                props: {
                    "title": "Flink Sql"
                }
            },
            "ports": [
                {
                    "id": uid(),
                    "group": "left"
                },
                {
                    "id": uid(),
                    "group": "right"
                }
            ]
        }
    },
    designerLocales: {
        'zh-CN': {
            "title": "Flink Sql",
            "settings": {
                "x-component-props": {
                    "title": "名称"
                }
            }
        }
    }
})

FlinkSqlNode.Resource = createResource({
    icon: 'TextAreaSource',
    "title": "Flink Sql",
    elements: [
        {
            componentName: 'FlowNode',
            props: {
                type: 'object',
                'x-component': 'FlinkSqlNode',
            },
        },
    ],
})