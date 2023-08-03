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

type WorkspacePanelProps = {
    children?: React.ReactNode
}
export const WorkspacePanel: FC<WorkspacePanelProps> = ({
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