import React, {useMemo} from 'react';
import './App.css';
import {
    ComponentTreeWidget,
    CompositePanel,
    Designer,
    Field, Form,
    Input,
    ResourceWidget,
    StudioPanel, ViewPanel, ViewportPanel, Workbench,
    WorkspacePanel
} from "@alkaid/designer/src";
import {createDesigner} from "@alkaid/designer/src/core";

function App() {
    const engine = useMemo(() => createDesigner({
        rootComponentName: 'Form',
    }), [])
    return (
        <Designer engine={engine}>
<Workbench>
    <StudioPanel>
        <CompositePanel>
            <CompositePanel.Item title={`组件`}>
                <ResourceWidget title={`表单组件`} sources={[Input]}/>
            </CompositePanel.Item>
        </CompositePanel>
        <WorkspacePanel>
            <ViewportPanel>
                <ViewPanel type="DESIGNABLE">
                    {()=>(<ComponentTreeWidget components={{
                        Form,
                        Field,
                        Input
                    }}/>)}
                </ViewPanel>
            </ViewportPanel>
        </WorkspacePanel>
    </StudioPanel>
</Workbench>
        </Designer>

    );
}

export default App;
