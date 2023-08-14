import {useEffect, useRef} from "react";
import {Graph, Path} from "@antv/x6";
import {uid} from "@alkaid/shared";
import {useGraphDesigner} from "../hooks";

export const FlowViewport = () => {
    const graphRef = useRef<HTMLDivElement>()
    const graphDesigner = useGraphDesigner()

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
            'algo-connector',
            (s, e) => {
                const offset = 4
                const deltaY = Math.abs(e.y - s.y)
                const control = Math.floor((deltaY / 3) * 2)

                const v1 = {x: s.x, y: s.y + offset + control}
                const v2 = {x: e.x, y: e.y - offset - control}

                return Path.normalize(
                    `M ${s.x} ${s.y}
                               L ${s.x} ${s.y + offset}
                               C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
                               L ${e.x} ${e.y}
                              `,
                )
            },
            true,
        )

        const graphInstance: Graph = new Graph({
            container: graphRef.current,
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
                snap: true,
                allowBlank: false,
                allowLoop: false,
                highlight: true,
                connector: 'algo-connector',
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
                        zIndex: 10,
                        data: {
                            id: edgeId
                        },
                    })
                },
            },
        })
        graphDesigner.setGraph(graphInstance)
    }, [])

    return <div ref={graphRef} style={{
        height: '100%'
    }}/>
}