import {Graph} from "@antv/x6";
import {FlowEngine} from "./FlowEngine";
import {Options as GraphOptions} from "@antv/x6/src/graph/options";

export class FlowViewport {
    engine?: FlowEngine
    graph?: Graph
    graphOptions?: Partial<GraphOptions.Manual>

    constructor(engine: FlowEngine) {
        this.engine = engine
        this.graphOptions = engine.graphOptions
    }

    setGraph(graph: Graph) {
        this.graph = graph
    }

    getGraph() {
        return this.graph
    }

}