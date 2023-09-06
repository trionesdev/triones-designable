import { createDesigner, GlobalRegistry } from "@alkaid/core";
import { useEffect, useMemo } from "react";
import "./App.css";
import {
  ComponentTreeWidget,
  CompositePanel,
  Designer,
  DesignerToolsWidget,
  ResourceWidget,
  SettingsPanel,
  StudioPanel,
  ToolbarPanel,
  ViewPanel,
  ViewportPanel,
  Workspace,
  WorkspacePanel,
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

function App() {
  const engine = useMemo(
    () =>
      createDesigner({
        rootComponentName: "RootNode",
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
    <Designer engine={engine}>
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
    </Designer>
  );
}

export default App;
