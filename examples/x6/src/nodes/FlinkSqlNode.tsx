import {DnFC} from "@alkaid/react";
import {BaseNode} from "./BaseNode";
import {createBehavior, createResource} from "@alkaid/core";
import React from "react";
import {uid} from "@alkaid/shared";

export const FlinkSqlNode: DnFC<React.ComponentProps<typeof BaseNode>> = BaseNode


FlinkSqlNode.Behavior = createBehavior({
    name: 'FlinkSqlNode',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'FlinkSqlNode',
    designerProps: {
        propsSchema: {},
        graphNodeProps: {
            data: {
                label: 'Flink Sql',
                icon: '',
                props: {}
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
            "title": "Flink Sql"
        }
    }
})

FlinkSqlNode.Resource = createResource({
    icon: 'TextAreaSource',
    "title": "Flink Sql",
    elements: [
        {
            componentName: 'Field',
            props: {
                type: 'object',
                'x-component': 'FlinkSqlNode',
            },
        },
    ],
})