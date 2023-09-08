import {
  // createDesigner,
  GlobalRegistry,
  KeyCode,
  Shortcut,
} from "@alkaid/core";
import { useEffect, useMemo } from "react";
import "./App.css";
import {
  ComponentTreeWidget,
  CompositePanel,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
  ToolbarPanel,
} from "@alkaid/react";
import {
  Field,
  Form,
  Input,
  Rate,
  Text,
  ArrayCards,
} from "@alkaid/formily-antd";
import { SettingsForm } from "@alkaid/react-settings-form";
import { transformToSchema } from "@alkaid/formily-transformer";
import { Button } from "antd";
import { DemoNode } from "./CustomNode/DemoNode";
import { FloatWrapper } from "./CustomNode/FloatWrapper";
import { RootNode } from "./CustomNode/RootNode";
import {
  ScaleDesigner,
  createDesigner,
  DesignerToolsWidget,
  Workspace,
  ViewportPanel,
  ViewPanel,
  WorkspacePanel,
} from "@alkaid/scale-workspace";
// import { ScaleDesigner } from "@alkaid/scale-workspace";

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
                JSON.stringify(transformToSchema(engine.getCurrentTree()))
              );
            },
          }),
        ],
        rootComponentName: "Form",
      }),
    []
  );

  const handleSave = () => {
    console.log(transformToSchema(engine.getCurrentTree()));
  };

  useEffect(() => {
    GlobalRegistry.setDesignerLanguage("zh-cn");
  }, []);

  return (
    <ScaleDesigner engine={engine}>
      <StudioPanel actions={[<Button onClick={handleSave}>保存</Button>]}>
        <CompositePanel>
          <CompositePanel.Item title="panels.Component" icon="Component">
            <ResourceWidget title="sources.Inputs" sources={[DemoNode]} />
            <ResourceWidget title="sources.Displays" sources={[Text]} />
          </CompositePanel.Item>
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
            </ToolbarPanel>
            <ViewportPanel style={{ height: "100%" }}>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      FloatWrapper,
                      RootNode,
                      ArrayCards,
                      Form,
                      Field,
                      Input,
                      Rate,
                      DemoNode,
                      Text,
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
    </ScaleDesigner>
  );
}

export default App;
