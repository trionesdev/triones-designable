import {GlobalRegistry} from '@alkaid/core';
import {useEffect, useMemo} from 'react';
import './App.css';
import {Canvas} from "./alkaid/flow_dep/components";
import {FlinkSqlNode} from "./nodes/FlinkSqlNode";
import {FlowDesigner} from "./alkaid/flow/containers";
import {createFlowDesigner} from "./alkaid/flow/externals";
import {ResourceWidget} from "./alkaid/flow/widgets/ResourceWidget";
import {ResourcePanel} from "./alkaid/flow/panels";

function App() {
    const engine = useMemo(
        () =>
            createFlowDesigner(),
        []
    )

    useEffect(() => {
        GlobalRegistry.setDesignerLanguage('zh-cn')

    }, []);
    GlobalRegistry.registerDesignerBehaviors({Canvas, FlinkSqlNode})
    return (
        <>
            <FlowDesigner engine={engine}>
                <ResourcePanel>
                    <ResourceWidget title={`测试`} sources={[FlinkSqlNode]}></ResourceWidget>
                </ResourcePanel>
            </FlowDesigner>
        </>
    );
}

export default App;
