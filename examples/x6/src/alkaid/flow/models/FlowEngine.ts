import {IEventProps} from "@alkaid/shared";
import {TreeNode} from "@alkaid/core";
import {FlowViewport} from "./FlowViewport";
import {Options as GraphOptions} from "@antv/x6/src/graph/options";

export type FlowEngineProps<T = Event> = IEventProps<T> & {}

export class FlowEngine {
    viewport?: FlowViewport
    graphOptions?: Partial<GraphOptions.Manual>

    constructor() {
        this.viewport = new FlowViewport(this)
    }

    findNodeById(id: string) {
        return TreeNode.findById(id)
    }

    unmount() {
    }

    mount() {
    }
}