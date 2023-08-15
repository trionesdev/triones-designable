import {GlobalRegistry} from '@alkaid/core';
import {useEffect, useMemo} from 'react';
import './App.css';
import {FlinkSqlNode} from "./nodes/FlinkSqlNode";
import {FlowDesigner} from "./alkaid/flow/containers";
import {createFlowDesigner} from "./alkaid/flow/externals";
import {ResourceWidget} from "./alkaid/flow/widgets/ResourceWidget";
import {ResourcePanel, StudioPanel, ViewportPanel, WorkspacePanel} from "./alkaid/flow/panels";
import {ComponentsWidget} from "./alkaid/flow/widgets/ComponentsWidget";
import {Field, Input} from "@alkaid/formily-antd";

function App() {
    const engine = useMemo(
        () =>
            createFlowDesigner(),
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
                        <ResourceWidget title={`测试`} sources={[Input,FlinkSqlNode]}></ResourceWidget>
                    </ResourcePanel>
                    <WorkspacePanel>
                        <ViewportPanel>
                            {()=>(<ComponentsWidget components={{
                                Field,
                                Input,
                                FlinkSqlNode
                            }}/>)}
                        </ViewportPanel>
                    </WorkspacePanel>
                </StudioPanel>
            </FlowDesigner>
        </>
    );
}

export default App;
