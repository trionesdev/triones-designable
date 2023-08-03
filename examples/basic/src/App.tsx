import React from 'react';
import './App.css';
import {
    ComponentTreeWidget,
    CompositePanel,
    Designer,
    Engine, Field, Form,
    Input,
    ResourceWidget,
    StudioPanel, ViewPanel, ViewportPanel,
    WorkspacePanel
} from "@alkaid/designer/src";

function App() {
    const engine = new Engine({
        rootComponentName: 'Form'
    })
    return (
        <Designer engine={engine}>
            <StudioPanel>
                <CompositePanel>
                    <CompositePanel.Item title={`组件`} >
                        <ResourceWidget title={`表单组件`} sources={[Input]}/>
                    </CompositePanel.Item>
                </CompositePanel>
                <WorkspacePanel>
                    <ViewportPanel>
                        <ViewPanel>
                            <ComponentTreeWidget components={{
                                Form,
                                Field,
                                Input
                            }}/>
                        </ViewPanel>
                    </ViewportPanel>
                </WorkspacePanel>
            </StudioPanel>
        </Designer>

    );
}

export default App;
