import _ from "lodash";
import {TreeNode} from "./models/TreeNode";

export const createBehavior = (
    ...behaviors: Array<any | any[]>
): any[] => {
    return behaviors.reduce((buf: any[], behavior) => {
        if (_.isArray(behavior)) return buf.concat(createBehavior(...behavior))
        const { selector } = behavior || {}
        if (!selector) return buf
        if (typeof selector === 'string') {
            behavior.selector = (node:any) => node.componentName === selector
        }
        return buf.concat(behavior)
    }, [])
}

export const createResource = (...sources: any[]): any[] => {
    return sources.reduce((buf, source) => {
        return buf.concat({
            ...source,
            node: new TreeNode({
                componentName: '$$ResourceNode$$',
                isSourceNode: true,
                children: source.elements || [],
            }),
        })
    }, [])
}