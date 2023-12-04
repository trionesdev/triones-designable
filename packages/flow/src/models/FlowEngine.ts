import {Event, IEventProps} from "@trionesdev/designable-shared";
import {TreeNode} from "@trionesdev/designable-core";
import {FlowViewport} from "./FlowViewport";
import {Options as GraphOptions} from "@antv/x6/src/graph/options";
import {ContextMenuItem} from "../types";
import {Cell, Graph} from "@antv/x6";

export type FlowEngineProps<T = Event> = IEventProps<T> & {
    componentName?: string
    viewport?: FlowViewport
    graphOptions?: Partial<GraphOptions.Manual>
    contextMenuService?: (type: string, cell: Cell, graph: Graph) => ContextMenuItem[]
}

export class FlowEngine extends Event {
    componentName?: string
    viewport?: FlowViewport
    graphOptions?: Partial<GraphOptions.Manual>
    contextMenuService?: (type: string, cell: Cell, graph: Graph) => ContextMenuItem[]
    props: FlowEngineProps<FlowEngine>

    constructor(props: FlowEngineProps<FlowEngine>) {
        super(props)
        this.props = {...props}
        this.componentName = props.componentName
        this.viewport = new FlowViewport(this)
        this.contextMenuService = props.contextMenuService
    }

    findNodeById(id: string) {
        return TreeNode.findById(id)
    }

    unmount() {
    }

    mount() {
    }
}