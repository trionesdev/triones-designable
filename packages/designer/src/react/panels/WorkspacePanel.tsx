import React, {FC} from "react";
import {GlobalToken, theme} from "antd";
import {CSSInterpolation, useStyleRegister} from "@ant-design/cssinjs";
import classNames from "classnames";

const {useToken} = theme;
const genWorkspacePanelStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            flex: '1 auto',
            height: "100%"
        }
    };
};

const genWorkspacePanelItemStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            flex: '1 auto',
            height: "100%",
            flexShrink:1,
            position:'relative'
        }
    };
};

type WorkspacePanelProps = {
    children?: React.ReactNode
}

type WorkspaceItemProps ={
    children:React.ReactNode
    style?: React.CSSProperties
    flexable?: boolean
}

export const WorkspacePanel: FC<WorkspacePanelProps> & {
    Item?: React.FC<WorkspaceItemProps>
}= ({
                                                            children
                                                        }) => {
    const prefixCls = 'alkaid-designer-workspace-panel';
    const {theme, token, hashId} = useToken();
    const wrapSSR = useStyleRegister(
        {theme, token, hashId, path: [prefixCls]},
        () => [genWorkspacePanelStyle(prefixCls, token)],
    );
    return wrapSSR(
        <div className={classNames(prefixCls, hashId)}>{children}</div>
    )
}

WorkspacePanel.Item = (props) => {
    const prefixCls = 'alkaid-designer-workspace-panel-item';
    const {theme, token, hashId} = useToken();
    const wrapSSR = useStyleRegister(
        {theme, token, hashId, path: [prefixCls]},
        () => [genWorkspacePanelItemStyle(prefixCls, token)],
    );
    return wrapSSR(
        <div
            className={classNames(prefixCls,hashId)}
            style={{
                ...props.style,
                flexGrow: props.flexable ? 1 : 0,
                flexShrink: props.flexable ? 1 : 0,
            }}
        >
            {props.children}
        </div>
    )
}