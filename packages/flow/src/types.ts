export interface ContextMenuItem {
  key?: string;
  label?: string;
  icon?: string;
  onClick: () => void;
}

export interface GraphData {
  nodes?: GraphNode[];
  edges?: GraphEdge[];
}

export interface GraphNode {
  id: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  label?: string;
  icon?: string;
  type?: string;
  shape: string;
  ports?: any[];

  [key: string]: any;
}

export interface GraphEdge {
  id: string;
  source: { cell: string; port: string };
  target: { cell: string; port: string };
  zIndex?: number;
}
