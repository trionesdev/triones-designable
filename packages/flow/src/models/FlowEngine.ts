import {Event, IEventProps} from "@alkaid/shared";
import {TreeNode} from "@alkaid/core";
import {FlowViewport} from "./FlowViewport";
import {Options as GraphOptions} from "@antv/x6/src/graph/options";
import {ContextMenuItem, GraphData} from "../types";
import {Cell, Graph, Model, Node} from "@antv/x6";
import _ from "lodash";
import FromJSONData = Model.FromJSONData;

export type FlowEngineProps<T = Event> = IEventProps<T> & {
    componentName?: string
    viewport?: FlowViewport
    graphOptions?: Partial<GraphOptions.Manual>
    contextMenuService?: (type: string, cell: Cell, graph: Graph) => ContextMenuItem[]
    onNodeClick?: (node: Node) => void
    onDrop?: (metadata: Node.Metadata, graph: Graph) => void
}

export class FlowEngine extends Event {
    componentName?: string
    viewport?: FlowViewport
    graphOptions?: Partial<GraphOptions.Manual>
    contextMenuService?: (type: string, cell: Cell, graph: Graph) => ContextMenuItem[]
    onNodeClick?: (node: Node) => void
    onDrop?: (metadata: Node.Metadata, graph: Graph) => void
    props: FlowEngineProps<FlowEngine>

    constructor(props: FlowEngineProps<FlowEngine>) {
        super(props)
        this.props = {...props}
        this.componentName = props.componentName

        this.graphOptions = props.graphOptions
        this.contextMenuService = props.contextMenuService
        this.onNodeClick = props.onNodeClick
        this.onDrop = props.onDrop

        this.viewport = new FlowViewport(this)
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
        this.viewport.graph.getNodes().forEach(node => {
            nodes.push(node.getData())
        })
        this.viewport.graph.getEdges().forEach(edge => {
            edges.push({
                id: edge.id,
                source: edge.source,
                target: edge.target
            })
        })
        return {nodes, edges}
    }

    graphRender(data: GraphData) {
        if (!_.isEmpty(data.nodes)) {
            data.nodes.forEach((node) => {
                this.viewport.addNode(node)
            })
        }
        if (!_.isEmpty(data.edges)) {
            data.edges.forEach((edge) => {
                this.viewport.addEdge(edge)
            })
        }
    }

    graphRenderFromJson(data: FromJSONData) {
        const nodes = _.get(data, 'nodes', [])
        const edges = _.get(data, 'edges', [])
        if (!_.isEmpty(nodes)) {
            nodes.forEach((node) => {
                this.viewport.addNode(node)
            })
        }
        if (!_.isEmpty(edges)) {
            edges.forEach((edge) => {
                this.viewport.addEdge(edge)
            })
        }
    }
}