import _ from "lodash";
import {TreeNode} from "./models";
import {IBehavior, IBehaviorHost, IResource, IResourceCreator, IResourceHost} from "./types";

export const isBehaviorHost = (val: any): val is IBehaviorHost =>
    val?.Behavior && isBehaviorList(val.Behavior)

export const isBehaviorList = (val: any): val is IBehavior[] =>
    Array.isArray(val) && val.every(isBehavior)

export const isBehavior = (val: any): val is IBehavior =>
    val?.name ||
    val?.selector ||
    val?.extends ||
    val?.designerProps ||
    val?.designerLocales

export const isResourceHost = (val: any): val is IResourceHost =>
    val?.Resource && isResourceList(val.Resource)

export const isResourceList = (val: any): val is IResource[] =>{
    return  Array.isArray(val) && val.every(isResource)
}


export const isResource = (val: any): val is IResource =>{
    return val?.node &&  val.node instanceof TreeNode
}


export const createBehavior = (
    ...behaviors: Array<any | any[]>
): any[] => {
    return behaviors.reduce((buf: any[], behavior) => {
        if (_.isArray(behavior)) return buf.concat(createBehavior(...behavior))
        const {selector} = behavior || {}
        if (!selector) return buf
        if (typeof selector === 'string') {
            behavior.selector = (node: any) => node.componentName === selector
        }
        return buf.concat(behavior)
    }, [])
}

export const createResource = (...sources: IResourceCreator[]): IResource[] => {
    // return sources.reduce((buf: IResource[], source) => {
    //
    //     const  ss =buf.concat({
    //         ...source,
    //         node: new TreeNode({
    //             componentName: '$$ResourceNode$$',
    //             isSourceNode: true,
    //             children: source.elements || [],
    //         }),
    //     })
    //     debugger
    //     return ss
    // }, [])

    return _.reduce(sources,(buf: IResource[], source)=>{
        return buf.concat({...source,node: new TreeNode({
                componentName: source.elements?.[0].componentName,
                isSourceNode: true,
                props: source.elements?.[0].props
            })})
    },[])
}