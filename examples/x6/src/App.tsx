import {GlobalRegistry} from '@alkaid/core';
import {useEffect, useMemo} from 'react';
import './App.css';
import {FlinkSqlNode, FlowNode} from "./nodes";
import {FlowDesigner} from "./alkaid/flow/containers";
import {createFlowDesigner} from "./alkaid/flow/externals";
import {ResourceWidget} from "./alkaid/flow/widgets/ResourceWidget";
import {ResourcePanel, SettingsPanel, StudioPanel, ViewportPanel, WorkspacePanel} from "./alkaid/flow/panels";
import {ComponentsWidget} from "./alkaid/flow/widgets/ComponentsWidget";
import {Cell, Graph} from "@antv/x6";
import {SettingsForm} from "./alkaid/flow/settings-form";
import {Field} from "@alkaid/formily-antd";

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

    useEffect(() => {
        GlobalRegistry.setDesignerLanguage('zh-cn')

    }, []);
    return (
        <>
            <FlowDesigner engine={engine}>
                <StudioPanel>
                    <ResourcePanel>
                        <ResourceWidget title={`开发任务`} sources={[FlinkSqlNode]}></ResourceWidget>
                    </ResourcePanel>
                    <WorkspacePanel>
                        <ViewportPanel>
                            {() => (<ComponentsWidget components={{
                                Field,
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
