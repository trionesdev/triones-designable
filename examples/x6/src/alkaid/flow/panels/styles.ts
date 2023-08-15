import {GlobalToken} from "antd";
import {CSSInterpolation} from "@ant-design/cssinjs";

export const genStudioPanelStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => [
    {
        [`.${prefixCls}`]: {
            display: 'flex',
            [`&.fixed`]: {
                position: 'fixed',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        }
    }
]

export const genResourcePanelStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => [
    {
        [`.${prefixCls}`]: {
            width: '300px'
        }
    }
]

export const genWorkspacePanelStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => [
    {
        [`.${prefixCls}`]: {
            flex: '1 auto',
            display: 'flex',
            width: 0,
            overflow: 'hidden'
        }
    }
]

export const genViewportPanelStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => [
    {
        [`.${prefixCls}`]: {
            flex: '1 auto',
            display: 'flex',
            backgroundColor: '#eee',
            padding: '4px',
            boxSizing: 'border-box',
            width: 0
        }
    }
]

export const genContextMenuPanelStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => [
    {
        [`.${prefixCls}-mask`]: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1000,
            cursor: 'default'
        },
        [`.${prefixCls}`]: {
            position: 'absolute',
            display: 'inline-block',
            minWidth: 160,
            minHeight: 32,
            margin: 0,
            padding: '4px',
            backgroundColor: '#fff',
            outline: 0,
            boxShadow: '0 2px 10px rgba(0,0,0,.12)',
            cursor: 'pointer'
        }
    }
]

export const genSettingsFormPanelStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => [
    {
        [`.${prefixCls}`]: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px'
        }
    }
]