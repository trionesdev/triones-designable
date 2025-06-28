import { Graph, Node } from '@antv/x6';
import { FlowEngine } from './FlowEngine';
import { Options as GraphOptions } from '@antv/x6/src/graph/options';
import { action, define, observable } from '@formily/reactive';
import { GraphEdge, GraphNode } from '../types';

export class FlowViewport {
  engine?: FlowEngine;
  graph?: Graph;
  graphOptions?: Partial<GraphOptions.Manual>;
  selectedNode?: Node;

  constructor(engine: FlowEngine) {
    this.engine = engine;
    this.graphOptions = engine.graphOptions;
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      graph: observable.ref,
      selectedNode: observable.ref,
      setGraph: action,
      setSelectedNode: action,
    });
  }

  setGraph(graph: Graph) {
    this.graph = graph;
  }

  getGraph() {
    return this.graph;
  }

  setSelectedNode(node: Node) {
    this.selectedNode = node;
  }

  cleanSelectedNode() {
    this.selectedNode = null;
  }

  addNode(node: GraphNode) {
    this.graph.addNode({
      id: node.id,
      x: node.x,
      y: node.y,
      width: node.width || 190,
      height: node.height || 36,
      type: node.type,
      shape: node.shape,
      ports: node.ports,
      data: node,
    });
  }

  addEdge(edge: GraphEdge) {
    this.graph.addEdge({
      id: edge.id,
      shape: 'dag-edge',
      source: edge.source,
      target: edge.target,
      zIndex: edge.zIndex || -1,
    });
  }
}
