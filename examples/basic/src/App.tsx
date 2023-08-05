import {createDesigner, KeyCode, Shortcut} from '@alkaid/core';
import {useMemo} from 'react';
import './App.css';
import {
    ComponentTreeWidget,
    CompositePanel,
    Designer,
    ResourceWidget,
    StudioPanel, ViewPanel,
    ViewportPanel,
    Workbench,
    WorkspacePanel
} from "@alkaid/react";
import {Field, Form, Input} from "@alkaid/formily-antd";

function App() {
    const engine = useMemo(
        () =>
            createDesigner({
                shortcuts: [
                    new Shortcut({
                        codes: [
                            [KeyCode.Meta, KeyCode.S],
                            [KeyCode.Control, KeyCode.S],
                        ],
                        handler(ctx) {
                            // saveSchema(ctx.engine)
                        },
                    }),
                ],
                rootComponentName: 'Form',
            }),
        []
    )
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
                                {() => (<ComponentTreeWidget components={{
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
