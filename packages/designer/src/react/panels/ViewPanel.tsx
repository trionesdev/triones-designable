import React, {FC} from "react";
import {GlobalToken, theme} from "antd";
import {CSSInterpolation, useStyleRegister} from "@ant-design/cssinjs";
import classNames from "classnames";

const {useToken} = theme;
const genViewPanelStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            height: "100%"
        }
    };
};

type ViewPanelPros = {
    children?: React.ReactNode
}
export const ViewPanel: FC<ViewPanelPros> = ({
                                                 children
                                             }) => {
    const prefixCls = 'alkaid-designer-view-panel';
    const {theme, token, hashId} = useToken();
    const wrapSSR = useStyleRegister(
        {theme, token, hashId, path: [prefixCls]},
        () => [genViewPanelStyle(prefixCls, token)],
    );
    return wrapSSR(
        <div className={classNames(prefixCls, hashId)}>{children}</div>
    )
}