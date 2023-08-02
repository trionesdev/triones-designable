import React from "react";
import {FC} from "react";
import {GlobalToken, Space, theme} from "antd";
import {CSSInterpolation, useStyleRegister} from "@ant-design/cssinjs";
import classNames from "classnames";

const {useToken} = theme;
const genCompositePanelItemStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            height: '100%',
            width: '300px',
        }
    };
};

type CompositePanelItemProps = {
    children?: React.ReactNode
    title?: string
}

export const CompositePanelItem: FC<CompositePanelItemProps> = ({
                                                                    children,
                                                                    title
                                                                }) => {
    const prefixCls = 'alkaid-designer-composite-panel-item';
    const {theme, token, hashId} = useToken();
    const wrapSSR = useStyleRegister(
        {theme, token, hashId, path: [prefixCls]},
        () => [genCompositePanelItemStyle(prefixCls, token)],
    );
    return wrapSSR(
        <div className={classNames(prefixCls, hashId)}>
            <div>{children}</div>
        </div>
    )
}

const genCompositePanelStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            height: '100%'
        }
    };
};

type CompositePanelProps = {
    children?: React.ReactNode
}
export const CompositePanel: FC<CompositePanelProps> & { Item: FC<CompositePanelItemProps> } = ({
                                                                                                    children
                                                                                                }) => {
    const prefixCls = 'alkaid-designer-composite-panel';
    const {theme, token, hashId} = useToken();
    const wrapSSR = useStyleRegister(
        {theme, token, hashId, path: [prefixCls]},
        () => [genCompositePanelStyle(prefixCls, token)],
    );
    return wrapSSR(
        <div className={classNames(prefixCls, hashId)}>
            {children}
        </div>
    )
}
CompositePanel.Item = CompositePanelItem