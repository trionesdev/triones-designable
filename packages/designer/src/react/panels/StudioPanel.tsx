import React, {FC} from "react"
import {Layout} from "../containers";
import {GlobalToken, theme} from "antd";
import {CSSInterpolation, useStyleRegister} from "@ant-design/cssinjs";
import classNames from "classnames";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const {useToken} = theme;
const genStudioPanelStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            height: '100%',
            width: '100%',
            display: 'flex',
            position: 'relative'
        }
    };
};

type StudioPanelProps = {
    children?: React.ReactNode
}
export const StudioPanel: FC<StudioPanelProps> = ({...props}) => {
    const prefixCls = 'alkaid-designer-studio-panel';
    const {theme, token, hashId} = useToken();
    const wrapSSR = useStyleRegister(
        {theme, token, hashId, path: [prefixCls]},
        () => [genStudioPanelStyle(prefixCls, token)],
    );

    return wrapSSR(
        <Layout>
            <div></div>
            <DndProvider backend={HTML5Backend}>
                <div className={classNames(prefixCls, hashId)}>{props.children}</div>
            </DndProvider>
        </Layout>
    )
}