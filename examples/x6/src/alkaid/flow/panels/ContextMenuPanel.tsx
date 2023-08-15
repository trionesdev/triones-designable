import {FC, useRef} from "react";
import {ContextMenuItem} from "../types";
import {Button} from "antd";
import {useCssInJs} from "@alkaid/react";
import {genContextMenuPanelStyle} from "./styles";
import cls from "classnames";
import {useClickAway} from "ahooks";

type ContextMenuPanelProps = {
    onDestroy: () => void,
    x: number,
    y: number
    items?: ContextMenuItem[]
}
export const ContextMenuPanel: FC<ContextMenuPanelProps> = ({
                                                                onDestroy,
                                                                x, y,
                                                                items
                                                            }) => {
    const ref = useRef<HTMLDivElement>(null);
    useClickAway(() => {
        onDestroy?.()
    }, ref);

    const prefix = "alkaid-flow-ctx-menu"
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genContextMenuPanelStyle})
    return wrapSSR(<div className={cls(`${prefix}-mask`, hashId)}>
        <div ref={ref} className={cls(prefix, hashId)} style={{top: y, left: x}}>
            {items.map((item) => <Button style={{textAlign: 'left'}} type={`text`} block
                                         onClick={() => {
                                             item.onClick?.()
                                             onDestroy?.()
                                         }}>{item.label}</Button>)}
        </div>
    </div>)
}