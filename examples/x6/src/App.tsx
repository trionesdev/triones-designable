import {GlobalRegistry} from '@alkaid/core';
import {useEffect, useMemo} from 'react';
import './App.css';
import {FlinkSqlNode, FlowNode} from "./nodes";
import {Cell, Graph} from "@antv/x6";
import {
    ComponentsWidget, createFlowDesigner,
    FlowDesigner,
    ResourcePanel,
    ResourceWidget, SettingsForm, SettingsPanel,
    StudioPanel,
    ViewportPanel,
    WorkspacePanel
} from "@alkaid/flow";
import {Button} from "antd";

function App() {
    const engine = useMemo(
        () =>
            createFlowDesigner({
                componentName:'FlowNode',
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

    useEffect(() => {
        GlobalRegistry.setDesignerLanguage('zh-cn')

    }, []);
    return (
        <>
            <FlowDesigner engine={engine}>
                <StudioPanel actions={[<Button onClick={handleSave}>保存</Button>]}>
                    <ResourcePanel>
                        <ResourceWidget title={`开发任务`} sources={[FlinkSqlNode]}></ResourceWidget>
                    </ResourcePanel>
                    <WorkspacePanel>
                        <ViewportPanel>
                            {() => (<ComponentsWidget components={{
                                FlowNode,
                                FlinkSqlNode
                            }}/>)}
                        </ViewportPanel>
                    </WorkspacePanel>
                    <SettingsPanel title={`属性设置`}>
                        <SettingsForm></SettingsForm>
                    </SettingsPanel>
                </StudioPanel>
            </FlowDesigner>
        </>
    );
}

export default App;
