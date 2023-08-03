import React, {FC, useEffect} from "react"
import type {CSSInterpolation} from '@ant-design/cssinjs';
import {useStyleRegister} from '@ant-design/cssinjs';
import classNames from 'classnames';
import {GlobalToken, theme} from 'antd';
import {DesignerEngineContext} from "../context";
import {Engine, GlobalRegistry} from "../../core";
import {Layout} from "./Layout";
import * as icons from "../icons"

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

type DesignerProps = {
    children?: React.ReactNode
    engine?: Engine
}

GlobalRegistry.registerDesignerIcons(icons)

export const Designer: FC<DesignerProps> = ({...props}) => {
    // const engine = useDesigner()


    useEffect(()=>{
        document.addEventListener('mousedown',(e)=>{
            console.log(e)
        })
    },[])

    const prefixCls = 'alkaid-designer';
    const {theme, token, hashId} = useToken();
    const wrapSSR = useStyleRegister(
        {theme, token, hashId, path: [prefixCls]},
        () => [genDesignerStyle(prefixCls, token)],
    );

    return wrapSSR(
        <Layout {...props} className={classNames(prefixCls, hashId)}>
            <DesignerEngineContext.Provider value={props.engine}>
                {props.children}
            </DesignerEngineContext.Provider>
        </Layout>
    )
}
