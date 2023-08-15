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
            display: 'flex'
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
            boxSizing: 'border-box'
        }
    }
]