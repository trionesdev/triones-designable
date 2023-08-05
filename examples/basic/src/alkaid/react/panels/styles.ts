import {GlobalToken} from "antd";
import {CSSInterpolation} from "@ant-design/cssinjs";

export const genStudioPanelStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            display: 'flex',
            width: '100%',
            height: '100%',
            flex: 1,
            minHeight: 0,
            position: 'relative',
            overflow: 'hidden',
            [`&-container`]: {
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                [`&.root`]: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                },
                [`&.absolute`]: {
                    position: 'absolute'
                },
                [`&.relative`]: {
                    position: 'relative'
                }
            },
            [`&.root`]: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        }
    };
};

export const genCompositePanelStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    console.log(prefixCls)
    console.log(token)
    return {
        [`.${prefixCls}`]: {
            flexGrow: 0,
            flexShrink: 0,
            display: 'flex',
            position: 'relative',
            userSelect: 'none',
            zIndex: 2,
            [`&-tabs`]: {
                display: 'flex',
                flexDirection: 'column',
                borderRight: `1px solid ${token.colorBorder}`,
                backgroundColor: `${token.colorBorderBg}`,
                zIndex: 2,
                position: 'relative',
                [`&-pane`]: {
                    color: `${token.colorTextSecondary}`,
                    minHeight: '48px',
                    minWidth: '48px',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    fontSize: '20px',
                    flexDirection: 'column',
                    [`&-title `]: {
                        fontSize: '10px',
                        marginTop: '6px',
                    },
                    [`&:hover`]: {
                        color: token.colorPrimaryHover,
                    },
                    [`&.active`]: {
                        color: token.colorPrimaryHover,
                        [`&::after`]: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            display: 'block',
                            content: '\' \'',
                            width: '3px',
                            height: '100%',
                            backgroundColor: token.colorPrimaryHover
                        }
                    }
                },
                [`&-content`]: {
                    width: '300px',
                    borderRight: `1px solid ${token.colorBorder}`,
                    background: `${token.colorBorderBg}`,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    boxSizing: 'content-box',
                    [`&.pinning`]: {
                        position: 'absolute',
                        zIndex: 1,
                        left: '100%',
                        top: 0,
                        borderRight: '1px solid transparent',
                        boxShadow: '-2px 5px 10px rgba(102, 102, 102, 0.42)'
                    }
                }

            }
        }
    }
}