import React from 'react';
import './App.css';
import {CompositePanel, Designer, Engine, Input, ResourceWidget, StudioPanel} from "@alkaid/designer/src";

function App() {
    const engine = new Engine()
    return (
        <Designer engine={engine}>
            <StudioPanel>
                <CompositePanel>
                    <CompositePanel.Item title={`组件`} >
                        <ResourceWidget title={`表单组件`} sources={[Input]}/>
                    </CompositePanel.Item>
                </CompositePanel>
            </StudioPanel>
        </Designer>

    );
}

export default App;
