import {createContext} from "react";
import {Graph} from "@antv/x6";
import {Engine} from "@alkaid/core";

export class GraphEngine extends Engine {
    graph?: Graph
    setGraph = (graph: Graph) => {
        this.graph = graph
    }
    getGraph = () => {
        return this.graph
    }

}

export const GraphDesignerEngineContext = createContext<GraphEngine>(null)