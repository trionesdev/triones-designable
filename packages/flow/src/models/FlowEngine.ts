import {Event, IEventProps} from "@alkaid/shared";
import {TreeNode} from "@alkaid/core";
import {FlowViewport} from "./FlowViewport";
import {Options as GraphOptions} from "@antv/x6/src/graph/options";
import {ContextMenuItem, GraphData} from "../types";
import {Cell, Graph} from "@antv/x6";
import _ from "lodash";

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

    getGraphData(): GraphData {
        const nodes: any = []
        const edges: any = []
        this.viewport.graph?.getCells().forEach(cell => {
            if (cell.isNode()) {
                nodes.push(cell.getData())
            } else if (cell.isEdge()) {
                edges.push(cell.getData())
            }
        })
        return {nodes, edges}
    }

    graphRender(data: GraphData) {
        if (_.isEmpty(data.nodes)) {
            data.nodes.forEach((node) => {
                this.viewport.graph.addNode(node)
            })
        }
        if (_.isEmpty(data.edges)) {
            data.edges.forEach((edge) => {
                this.viewport.graph.addEdge(edge)
            })
        }
    }
}