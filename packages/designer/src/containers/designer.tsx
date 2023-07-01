import React from "react"
import type {CSSInterpolation} from '@ant-design/cssinjs';
import {useStyleRegister} from '@ant-design/cssinjs';
import classNames from 'classnames';
import {GlobalToken, theme} from 'antd';

const {useToken} = theme;

const genDesignerStyle = (
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


const Designer = () => {
    const prefixCls = 'alkaid-designer';
    const {theme, token, hashId} = useToken();
    const wrapSSR = useStyleRegister(
        {theme, token, hashId, path: [prefixCls]},
        () => [genDesignerStyle(prefixCls, token)],
    );

    return wrapSSR(
        <div className={classNames(prefixCls, hashId)}>

        </div>
    )
}
export default Designer
