import {FC} from "react";
import {useSelectedNode} from "../hooks";
import {observer} from "@formily/reactive-react";
import {useCssInJs} from "@alkaid/react";
import {genSettingsFormPanelStyle} from "./styles";
import cls from "classnames";

type SettingsFormPanelProps = {}
export const SettingsFormPanel: FC<SettingsFormPanelProps> = observer(() => {
    const prefix = "af-settings-form-panel"
    const selectedNode = useSelectedNode()
    console.log("-----")
    console.log(selectedNode)
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genSettingsFormPanelStyle})
    return <>{
        selectedNode && wrapSSR(<div className={cls(prefix, hashId)}>s</div>)
    }</>
})