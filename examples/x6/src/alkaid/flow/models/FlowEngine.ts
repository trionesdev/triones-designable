import {Graph} from "@antv/x6";
import {IEventProps} from "@alkaid/shared";
import {TreeNode} from "@alkaid/core";

export type FlowEngineProps<T = Event> = IEventProps<T> & {}

export class FlowEngine {
    graph?: Graph

    findNodeById(id: string) {
        return TreeNode.findById(id)
    }
    unmount() {
    }

    mount() {
    }
}