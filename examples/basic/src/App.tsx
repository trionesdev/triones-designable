import {
  createDesigner,
  GlobalRegistry,
  KeyCode,
  Shortcut,
} from '@trionesdev/designable-core';
import { useEffect, useMemo } from 'react';
import './App.css';
import {
  ComponentTreeWidget,
  CompositePanel,
  Designer,
  DesignerToolsWidget,
  HistoryWidget, IDesignerComponents,
  OutlineTreeWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
  ToolbarPanel,
  ViewPanel,
  ViewportPanel,
  ViewToolsWidget,
  Workspace,
  WorkspacePanel,
} from '@trionesdev/designable-react';
import {
  ArrayCards,
  ArrayTable,
  Field,
  Form,
  Input,
  NumberPicker,
  Password,
  Rate,
} from '@trionesdev/designable-formily-antd';
import { SettingsForm } from '@trionesdev/designable-react-settings-form';
import { transformToSchema } from '@trionesdev/designable-formily-transformer';
import { Button } from 'antd';
import { PreviewWidget } from './PreviewWidget';

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
              console.log(
                JSON.stringify(transformToSchema(engine.getCurrentTree())),
              );
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    [],
  );

  const handleSave = () => {
    console.log(JSON.stringify(transformToSchema(engine.getCurrentTree())));
  };

  useEffect(() => {
    GlobalRegistry.setDesignerLanguage('zh-cn');
  }, []);

  const components: IDesignerComponents = {
    Form,
    Field,
    Input,
    Rate,
    NumberPicker,
    Password,
    ArrayCards,
    ArrayTable,
  };

  return (
    <Designer engine={engine}>
      <StudioPanel actions={[<Button onClick={handleSave}>保存</Button>]}>
        <CompositePanel>
          <CompositePanel.Item title="panels.Component" icon="Component">
            <ResourceWidget
              title="sources.Inputs"
              sources={[Input, Password, NumberPicker, Rate]}
            />
            <ResourceWidget title="sources.Layouts" sources={[]} />
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
                    components={components}
                  />
                )}
              </ViewPanel>
              <ViewPanel type={`PREVIEW`}>
                {(tree) => <PreviewWidget tree={tree} components={components} />}
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
