import {DnFC} from "@trionesdev/designable-react";
import {BaseNode} from "./BaseNode";
import {createBehavior, createResource} from "@trionesdev/designable-core";
import React from "react";
import {uid} from "@trionesdev/designable-shared";
import _ from "lodash";

export const FlinkSqlNode: DnFC<React.ComponentProps<typeof BaseNode>> = _.cloneDeep(BaseNode)


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
                                },
                                cron:{
                                    type:'string',
                                    'x-decorator': 'FormItem',
                                    'x-component': 'FlinkSqlSelect',
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
            label: 'Flink Sql',
            icon: 'TextAreaSource',
            type: 'FLINK_SQL',
            props: {
                "title": "Flink Sql"
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
                    "title": "名称",
                    "cron":"调度"
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