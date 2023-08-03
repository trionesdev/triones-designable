import React, {FC} from "react";
import {GlobalToken, theme} from "antd";
import {CSSInterpolation, useStyleRegister} from "@ant-design/cssinjs";
import classNames from "classnames";

const {useToken} = theme;
const genViewportPanelStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            height: "100%"
        }
    };
};

type ViewportPanelProps = {
    children?: React.ReactNode
}
export const ViewportPanel: FC<ViewportPanelProps> = ({
                                                          children
                                                      }) => {
    const prefixCls = 'alkaid-designer-viewport-panel';
    const {theme, token, hashId} = useToken();
    const wrapSSR = useStyleRegister(
        {theme, token, hashId, path: [prefixCls]},
        () => [genViewportPanelStyle(prefixCls, token)],
    );
    return wrapSSR(
        <div className={classNames(prefixCls, hashId)}>{children}</div>
    )
}