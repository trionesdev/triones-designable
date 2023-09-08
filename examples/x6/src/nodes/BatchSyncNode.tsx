import {DnFC} from "@alkaid/react";
import React from "react";
import {BaseNode} from "./BaseNode";
import {createBehavior, createResource} from "@alkaid/core";
import {uid} from "@alkaid/shared";
import _ from "lodash";

export const BatchSyncNode: DnFC<React.ComponentProps<typeof BaseNode>> = _.cloneDeep(BaseNode)

BatchSyncNode.Behavior = createBehavior({
    name: 'BatchSyncNode',
    extends: ['FlowNode'],
    selector: (node) => node.props?.['x-component'] === 'BatchSyncNode',
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
            "title": "离线同步"
        },
        graphNodeProps: {
            type: 'BATCH_SYNC',
            label: '离线同步任务',
            icon: 'RadioGroupSource',
            props: {
                "title": "离线同步"
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
            "title": "离线同步",
            "settings": {
                "x-component-props": {
                    "title": "名称"
                }
            }
        }
    }
})

BatchSyncNode.Resource = createResource({
    icon: 'RadioGroupSource',
    "title": "离线同步任务",
    elements: [
        {
            componentName: 'FlowNode',
            props: {
                type: 'object',
                'x-component': 'BatchSyncNode',
            },
        },
    ],
})