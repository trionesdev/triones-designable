import {useCssInJs} from "@alkaid/react";
import {genFlowViewportStyle} from "./styles";
import cls from "classnames";
import {useEffect, useRef} from "react";
import {Graph, Path} from "@antv/x6";
import {uid} from "@alkaid/shared";
import {useFlowViewport} from "../hooks";
import {useDrop} from "react-dnd";
import {TreeNode} from "@alkaid/core";
import _ from "lodash";
import ReactDOM from "react-dom/client";
import {ContextMenuPanel} from "../panels/ContextMenuPanel";
import {observer} from "@formily/reactive-react";
import React from "react";

export const FlowViewport = observer(() => {
    const prefix = "alkaid-flow-viewport"
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genFlowViewportStyle})

    const graphRef = useRef<HTMLDivElement>()
    const viewport = useFlowViewport()

    const [{}, drop] = useDrop(() => ({
        accept: 'flow-node',
        drop: (node: TreeNode, monitor) => {
            const pagePoint = monitor.getClientOffset()
            const localPoint = viewport.graph.pageToLocal(pagePoint?.x!, pagePoint?.y!)
            const graphPoint = viewport.graph.localToGraph(localPoint)
            const addNode = (node: TreeNode) => {
                let id = uid()
                let nodeConfig = _.merge({}, {
                    id: id,
                    x: graphPoint.x, y: graphPoint.y,
                    width: 190,
                    height: 36,
                    shape: node.props['x-component'],
                    data: {
                        id: id,
                        shape: node.props['x-component']
                    }
                }, node.designerProps?.graphNodeProps)

                viewport.graph.addNode(nodeConfig)
            }

            if (node.componentName === '$$ResourceNode$$') {
                if (!_.isEmpty(node.children)) {
                    _.forEach(node.children, (comp: TreeNode) => {
                        addNode(comp)
                    })
                }
            } else {
                addNode(node)
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [viewport]);

    useEffect(() => {
        Graph.registerEdge(
            'dag-edge',
            {
                inherit: 'edge',
                attrs: {
                    line: {
                        stroke: '#C2C8D5',
                        strokeWidth: 1,
                        // targetMarker: null,
                    },
                },
            },
            true,
        )
        Graph.registerConnector(
            'curveConnector',
            (sourcePoint, targetPoint) => {
                const hgap = Math.abs(targetPoint.x - sourcePoint.x)
                const path = new Path()
                path.appendSegment(
                    Path.createSegment('M', sourcePoint.x - 4, sourcePoint.y),
                )
                path.appendSegment(
                    Path.createSegment('L', sourcePoint.x + 12, sourcePoint.y),
                )
                // 水平三阶贝塞尔曲线
                path.appendSegment(
                    Path.createSegment(
                        'C',
                        sourcePoint.x < targetPoint.x
                            ? sourcePoint.x + hgap / 2
                            : sourcePoint.x - hgap / 2,
                        sourcePoint.y,
                        sourcePoint.x < targetPoint.x
                            ? targetPoint.x - hgap / 2
                            : targetPoint.x + hgap / 2,
                        targetPoint.y,
                        targetPoint.x - 6,
                        targetPoint.y,
                    ),
                )
                path.appendSegment(
                    Path.createSegment('L', targetPoint.x + 2, targetPoint.y),
                )

                return path.serialize()
            },
            true,
        )


        // @ts-ignore
        const graphInstance: Graph = new Graph(_.merge({
            panning: {
                enabled: true,
                eventTypes: ['leftMouseDown', 'mouseWheel'],
            },
            mousewheel: {
                enabled: true,
                modifiers: 'ctrl',
                factor: 1.1,
                maxScale: 1.5,
                minScale: 0.5,
            },
            highlighting: {
                magnetAdsorbed: {
                    name: 'stroke',
                    args: {
                        attrs: {
                            fill: '#fff',
                            stroke: '#31d0c6',
                            strokeWidth: 4,
                        },
                    },
                },
            },
            connecting: {
                router: 'manhattan',
                snap: true,
                allowBlank: false,
                allowLoop: false,
                highlight: true,
                connector: {
                    name: 'curveConnector',
                },
                connectionPoint: 'anchor',
                anchor: 'center',
                validateMagnet({magnet}) {
                    return magnet.getAttribute('port-group') !== 'top'
                },
                createEdge() {
                    const edgeId = uid()
                    return graphInstance.createEdge({
                        id: edgeId,
                        shape: 'dag-edge',
                        // attrs: {
                        //     line: {
                        //         strokeDasharray: '5 5',
                        //     },
                        // },
                        zIndex: -1,
                        data: {
                            id: edgeId
                        },
                    })
                },
            },
        }, viewport.graphOptions, {container: graphRef.current}))
        graphInstance.on('node:moved', ({node}) => {
            const nodeData = node.getData()
            const position = node.position()
            node.setData({
                ...nodeData,
                x: position?.x,
                y: position?.y,
            })
        })

        graphInstance.on('node:resized', ({node}: { node: any }) => {
            const nodeData = node.getData()
            const size = node.size()
            node.setData({
                ...nodeData,
                width: size?.width,
                height: size?.height,
            })
        })
        graphInstance.on('node:click', ({e, x, y, cell, view}) => {
            viewport.setSelectedNode(cell)
        })
        graphInstance.on('blank:click', () => {
            viewport.cleanSelectedNode()
        })
        graphInstance.on('cell:contextmenu', ({e, x, y, cell, view}) => {
            let type: string = 'node';
            if (cell.isNode()) {
                type = 'node'
            } else if (cell.isEdge()) {
                type = 'edge'
            }
            const localPoint = view.graph.localToGraph(x, y)
            const items = viewport.engine.contextMenuService(type, cell, graphInstance)
            console.log(items)
            //region 菜单载体
            const div = document.createElement('div');
            e.currentTarget.appendChild(div)
            const root = ReactDOM.createRoot(
                div as HTMLElement
            );

            function destroy() {
                root.unmount();
                if (div.parentNode) {
                    div.parentNode.removeChild(div);
                }
            }

            //endregion

            root.render(<ContextMenuPanel onDestroy={destroy} x={localPoint.x} y={localPoint.y} items={items}/>)
        })
        viewport.setGraph(graphInstance)
    }, [])

    return wrapSSR(<div className={cls(prefix, hashId)} ref={drop}>
        <div style={{width: '100%', height: '100%'}} ref={graphRef}/>
    </div>)
})