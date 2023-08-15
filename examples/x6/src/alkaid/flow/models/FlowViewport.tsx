import {Graph, Node} from "@antv/x6";
import {FlowEngine} from "./FlowEngine";
import {Options as GraphOptions} from "@antv/x6/src/graph/options";
import {action, define, observable} from "@formily/reactive";

export class FlowViewport {
    engine?: FlowEngine
    graph?: Graph
    graphOptions?: Partial<GraphOptions.Manual>
    selectedNode?: Node

    constructor(engine: FlowEngine) {
        this.engine = engine
        this.graphOptions = engine.graphOptions
        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            selectedNode: observable.ref,
            setGraph: action,
            setSelectedNode: action
        })
    }

    setGraph(graph: Graph) {
        this.graph = graph
    }

    getGraph() {
        return this.graph
    }

    setSelectedNode(node: Node) {
        this.selectedNode = node
    }

    cleanSelectedNode() {
        this.selectedNode = null
    }
}