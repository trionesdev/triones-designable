import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

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
          bottom: 0,
        },
        [`&.absolute`]: {
          position: 'absolute',
        },
        [`&.relative`]: {
          position: 'relative',
        },
      },
      [`&-header`]: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 0,
        flexShrink: 0,
        justifyContent: 'space-between',
        background: `#fff`,
        borderBottom: `1px solid #d9d9d9`,
        padding: '4px',
        [`&-logo`]: {
          display: 'flex',
          alignItems: 'center',
        },
        [`&-actions`]: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        },
      },
      [`&.root`]: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
  };
};

export const genCompositePanelStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => {
  console.log(prefixCls);
  console.log(token);
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
              content: "' '",
              width: '3px',
              height: '100%',
              backgroundColor: token.colorPrimaryHover,
            },
          },
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
            boxShadow: '-2px 5px 10px rgba(102, 102, 102, 0.42)',
          },
        },
        [`&-header`]: {
          padding: '14px 7px',
          color: token.colorText,
          lineHeight: '18px',
          fontSize: '16px',
          borderBottom: `1px solid ${token.colorBorder}`,
          display: 'flex',
          justifyContent: 'space-between',
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
      },
      [`&.direction-right`]: {
        flexDirection: `row-reverse`,
        [`.${prefixCls}-tabs-pane.active:after`]: {
          left: 'auto',
          right: '-1px',
        },
        [`.${prefixCls}-tabs-content.pinning`]: {
          left: 'auto',
          right: '100%',
          top: 0,
        },
        [`.${prefixCls}-tabs-content`]: {
          borderRight: 'none',
          borderLeft: `1px solid ${token.colorBorder}`,
        },
        [`.${prefixCls}-tabs`]: {
          borderLeft: `1px solid ${token.colorBorder}`,
        },
      },
    },
  };
};

export const genWorkspacePanelStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      padding: '4px',
      overflow: 'hidden',
      boxSizing: 'border-box',
      backgroundColor: '#eee',
      position: 'relative',
      zIndex: 1,
      [`&-item`]: {
        position: 'relative',
      },
      [`button[disabled]`]: {
        pointerEvents: `none`,
      },
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
