import {DnFC} from "@alkaid/react";
import {BaseNode} from "./BaseNode";
import {createBehavior, createResource} from "@alkaid/core";

export const FlinkSqlNode:DnFC =()=>{
    return <BaseNode/>
}

FlinkSqlNode.Behavior=createBehavior({
    name: 'FlinkSqlNode',
    selector: (node) => node.componentName === 'FlinkSqlNode',
    designerProps:{

    },
    designerLocales:{
        'zh-CN':{
            "title":"Flink Sql"
        }
    }
})

FlinkSqlNode.Resource = createResource({
    icon: 'TextAreaSource',
    "title":"Flink Sql",
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