import {GlobalRegistry} from '@trionesdev/designable-core';
import {useEffect, useMemo} from 'react';
import './App.css';
import {BatchSyncNode, FlinkSqlNode, FlowNode} from "./nodes";
import {Cell, Graph} from "@antv/x6";
import {
    ComponentsWidget, createFlowDesigner,
    FlowDesigner,
    ResourcePanel,
    ResourceWidget, SettingsForm, SettingsPanel,
    StudioPanel,
    ViewportPanel,
    WorkspacePanel
} from "@trionesdev/designable-flow";
import {Button} from "antd";
import {FlinkSqlSelect} from "./components/FlinkSqlSelect";

function App() {
    const engine = useMemo(
        () =>
            createFlowDesigner({
                componentName:'FlowNode',
                graphOptions:{
                    connecting: {
                        router: 'er',
                        snap: true,
                        allowBlank: false,
                        allowLoop: false,
                        highlight: true,
                        connector: {
                            name: 'normal',
                        },
                        connectionPoint: 'anchor',
                        anchor: 'center',
                    },
                },
                onDrop:(metadata, graph)=>{
                    graph.addNode(metadata)
                },
                onNodeDoubleClick:(node)=>{
                    console.log("node:doubleClick")
                },
                contextMenuService: (type, cell: Cell, graph: Graph) => {
                    let items = []
                    switch (type) {
                        case "node":
                            items = [
                                {
                                    label: "删除节点",
                                    onClick: () => {
                                        graph.removeNode(cell.id)
                                    }
                                }
                            ]
                            break
                        case "edge":
                            items = [
                                {
                                    label: "删除连接线",
                                    onClick: () => {
                                        graph.removeEdge(cell.id)
                                    }
                                }
                            ]
                            break
                        default:
                            break
                    }
                    return items
                }
            }),
        []
    )

    const handleSave = () => {
      console.log(engine.getGraphData())
    }

    const handleRender = () => {
      engine.graphRender({nodes:[
              {
                  "id": "5khhymwwcm0",
                  "x": 140,
                  "y": 83,
                  "shape": "FlinkSqlNode",
                  "label": "Flink Sql",
                  "icon": "TextAreaSource",
                  "props": {
                      "title": "Flink Sql"
                  },
                  "ports": [
                      {
                          "id": "dlou790rk0z",
                          "group": "left"
                      },
                      {
                          "id": "lhg4f0oikjo",
                          "group": "right"
                      }
                  ]
              },
              {
                  "id": "6v1l4x94cax",
                  "x": 538,
                  "y": 93,
                  "shape": "FlinkSqlNode",
                  "label": "Flink Sql",
                  "icon": "TextAreaSource",
                  "props": {
                      "title": "Flink Sql"
                  },
                  "ports": [
                      {
                          "id": "dlou790rk0z",
                          "group": "left"
                      },
                      {
                          "id": "lhg4f0oikjo",
                          "group": "right"
                      }
                  ]
              }
          ],edges:[
              {
                  "id": "0tn7qk3p1rj",
                  "source": {
                      "cell": "5khhymwwcm0",
                      "port": "lhg4f0oikjo"
                  },
                  "target": {
                      "cell": "6v1l4x94cax",
                      "port": "dlou790rk0z"
                  }
              }
          ]})
    }

    useEffect(() => {
        GlobalRegistry.setDesignerLanguage('zh-cn')

    }, []);
    return (
        <>
            <FlowDesigner engine={engine}>
                <StudioPanel actions={[<Button onClick={handleSave}>保存</Button>,<Button onClick={handleRender}>渲染</Button>]}>
                    <ResourcePanel>
                        <ResourceWidget title={`开发任务`} sources={[FlinkSqlNode,BatchSyncNode]}></ResourceWidget>
                    </ResourcePanel>
                    <WorkspacePanel>
                        <ViewportPanel>
                            {() => (<ComponentsWidget components={{
                                FlowNode,
                                FlinkSqlNode,
                                BatchSyncNode
                            }}/>)}
                        </ViewportPanel>
                    </WorkspacePanel>
                    <SettingsPanel title={`属性设置`}>
                        <SettingsForm components={{FlinkSqlSelect}}/>
                    </SettingsPanel>
                </StudioPanel>
            </FlowDesigner>
        </>
    );
}

export default App;
