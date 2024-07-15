import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genStudioPanelStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      [`&.fixed`]: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      [`&-header`]: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      [`&-body`]: {
        display: 'flex',
        flex: '1 auto',
      },
    },
  },
];

export const genResourcePanelStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      width: '220px',
    },
  },
];

export const genWorkspacePanelStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      flex: '1 auto',
      display: 'flex',
      width: 0,
      overflow: 'hidden',
    },
  },
];

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
      width: 0,
    },
  },
];

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
      cursor: 'default',
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
      cursor: 'pointer',
    },
  },
];

export const genSettingsPanelStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      flexGrow: 0,
      flexShrink: 0,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 2,
      width: '300px',
      background: `${token.colorBgBase}`,
      borderLeft: `1px solid ${token.colorBorder}`,
      height: '100%',
      boxSizing: 'content-box',
      userSelect: 'none',
      [`&.pinning`]: {
        position: 'absolute',
        zIndex: 10,
        top: 0,
        right: 0,
        boxShadow: `2px 5px 10px rgba(102, 102, 102, 0.52)`,
        borderLeft: `1px solid transparent`,
      },
      [`&-header`]: {
        padding: `14px 7px`,
        color: token.colorText,
        lineHeight: '18px',
        fontSize: '16px',
        borderBottom: `1px solid ${token.colorBorder}`,
        display: 'flex',
        justifyContent: `space-between`,
        [`&-actions`]: {
          display: 'flex',
          alignItems: 'center',
          [`& > *`]: {
            marginRight: '8px',
            [`&:last-child`]: {
              marginRight: 0,
            },
          },
        },
        [`&-pin`]: {
          transition: 'all 0.15s ease-in-out',
          [`&:hover`]: {
            transform: 'scale(1.1)',
          },
        },
        [`&-title`]: {
          fontSize: '20px',
        },
        [`&-close`]: {
          transition: `all 0.15s ease-in-out`,
          [`&:hover`]: {
            transform: `rotate(90deg)`,
          },
        },
      },
      [`&-body`]: {
        flexGrow: 2,
        flexShrink: 2,
        overflow: 'overlay',
        overflowX: 'hidden',
        height: '100%',
      },
      [`&-opener`]: {
        position: `absolute`,
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        background: token.colorBgBase,
        border: `1px solid ${token.colorBorder}`,
        color: token.colorText,
        boxShadow: `0 0 6px rgb(0 0 0 / 10%)`,
        borderRadius: `3px`,
        display: 'flex',
        alignItems: `center`,
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        [`.dn-icon`]: {
          transition: `all 0.15s ease-in-out`,
        },
        [`&:hover .dn-icon`]: {
          transform: 'rotate(45deg)',
        },
      },
    },
  },
];
