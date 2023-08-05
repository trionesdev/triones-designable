import {createDesigner, KeyCode, Shortcut} from '@alkaid/core';
import {useMemo} from 'react';
import './App.css';
import {
    ComponentTreeWidget,
    CompositePanel,
    Designer, DesignerToolsWidget, HistoryWidget, OutlineTreeWidget,
    ResourceWidget, SettingsPanel,
    StudioPanel, ToolbarPanel, ViewPanel,
    ViewportPanel, ViewToolsWidget, Workspace,
    WorkspacePanel
} from "@alkaid/react";
import {ArrayCards, ArrayTable, Field, Form, Input, NumberPicker, Password, Rate} from "@alkaid/formily-antd";
import {SettingsForm} from "@alkaid/react-settings-form";

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
            <StudioPanel >
                <CompositePanel>
                    <CompositePanel.Item title="panels.Component" icon="Component">
                        <ResourceWidget
                            title="sources.Inputs"
                            sources={[
                                Input,
                                Password,
                                NumberPicker,
                                Rate,
                            ]}
                        />
                        <ResourceWidget
                            title="sources.Layouts"
                            sources={[

                            ]}
                        />
                        <ResourceWidget
                            title="sources.Arrays"
                            sources={[ArrayCards, ArrayTable]}
                        />
                        {/*<ResourceWidget title="sources.Displays" sources={[Text]} />*/}
                    </CompositePanel.Item>
                    <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
                        <OutlineTreeWidget />
                    </CompositePanel.Item>
                    <CompositePanel.Item title="panels.History" icon="History">
                        <HistoryWidget />
                    </CompositePanel.Item>
                </CompositePanel>
                <Workspace id="form">
                    <WorkspacePanel>
                        <ToolbarPanel>
                            <DesignerToolsWidget />
                            <ViewToolsWidget
                                use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']}
                            />
                        </ToolbarPanel>
                        <ViewportPanel style={{ height: '100%' }}>
                            <ViewPanel type="DESIGNABLE">
                                {() => (
                                    <ComponentTreeWidget
                                        components={{
                                            Form,
                                            Field,
                                            Input,
                                            Rate,
                                            NumberPicker,
                                            Password,
                                            ArrayCards,
                                            ArrayTable,
                                        }}
                                    />
                                )}
                            </ViewPanel>
                        </ViewportPanel>
                    </WorkspacePanel>
                </Workspace>
                <SettingsPanel title="panels.PropertySettings">
                    <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
                </SettingsPanel>
            </StudioPanel>
        </Designer>

    );
}

export default App;
