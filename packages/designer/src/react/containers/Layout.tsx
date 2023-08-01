import React, {FC} from "react"
import {GlobalToken, theme} from "antd";
import {CSSInterpolation, useStyleRegister} from "@ant-design/cssinjs";
import {DesignerEngineContext} from "../context";

const {useToken} = theme;
const genLayoutStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            height: '100%',
            width: '100%'
        }
    };
};

type LayoutProps = {
    children?: React.ReactNode,
    className?: string
}
export const Layout: FC<LayoutProps> = ({
                                     children,
                                     ...props
                                 }) => {

    const prefixCls = 'alkaid-designer-layout';
    const {theme, token, hashId} = useToken();
    const wrapSSR = useStyleRegister(
        {theme, token, hashId, path: [prefixCls]},
        () => [genLayoutStyle(prefixCls, token)],
    );

    return <div>
        {children}
    </div>
}