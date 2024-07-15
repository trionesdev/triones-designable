import { GlobalToken } from 'antd';
import { CSSInterpolation, Keyframes } from '@ant-design/cssinjs';

const slideToTop = new Keyframes('slideToTop', {
  from: {
    transform: 'translateY(-10%)',
    opacity: 0,
  },

  to: {
    transform: 'translateY(0)',
    opacity: 0.8,
  },
});

export const genAuxToolsStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      transform: 'perspective(1px) translate3d(0, 0, 0)',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 9998,
    },
    [`.dn-aux-button`]: {
      [`button`]: {
        fontSize: '12px !important',
        display: 'flex',
        alignItems: 'center',
        padding: '0 3px',
        height: '20px',
        color: token.colorPrimaryText,
        background: token.colorPrimaryBg,
        borderColor: token.colorPrimary,
        [`&:hover,&:focus`]: {
          color: token.colorPrimaryTextHover,
          background: token.colorPrimaryBgHover,
          borderColor: token.colorPrimaryHover,
        },
        [`&:active`]: {
          color: token.colorPrimaryTextActive,
          background: token.colorPrimaryBgHover,
          borderColor: token.colorPrimaryHover,
        },
      },
    },
    [`.dn-aux-cover-rect`]: {
      [`&.dragging`]: {
        backgroundColor: 'rgba(24, 144, 255, 0.26)',
      },
      [`&.dropping`]: {
        backgroundColor: `rgba(24, 144, 255, 0.34)`,
      },
    },
    [`.dn-aux-free-selection`]: {
      backgroundColor: 'rgba(24, 144, 255, 1)',
      borderColor: 'rgba(24, 144, 255, 1)',
    },
    [`.dn-aux-helpers`]: {
      position: 'absolute',
      pointerEvents: 'all',
      zIndex: 10,
      userSelect: 'none',
      [`&.bottom-right`]: {
        top: '100%',
        right: 0,
      },
      [`&.bottom-left`]: {
        top: '100%',
        left: 0,
      },
      [`&.bottom-center`]: {
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
      },
      [`&.inner-top-right`]: {
        top: '-2px',
        right: '2px',
      },
      [`&.inner-top-left`]: {
        top: '-2px',
        left: '2px',
      },
      [`&.inner-top-center`]: {
        top: '-2px',
        right: '2px',
      },
      [`&.inner-bottom-right `]: {
        bottom: '-2px',
        right: '2px',
      },
      [`&.inner-bottom-left`]: {
        bottom: '-2px',
        left: '2px',
      },
      [`&.inner-bottom-center`]: {
        bottom: '-2px',
        right: '2px',
      },
      [`&.top-right`]: {
        bottom: '100%',
        right: 0,
      },
      [`&.top-left`]: {
        bottom: '100%',
        left: 0,
      },
      [`&.top-center`]: {
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
      },
      [`button`]: {
        [`span`]: {
          transform: 'scale(0.9)',
          marginLeft: '2px',
          [`&.dn-icon`]: {
            transform: 'scale(1)',
            marginLeft: 0,
          },
        },
      },
      [`&-content`]: {
        display: 'flex',
        flexWrap: 'nowrap',
        whiteSpace: 'nowrap',
        [`button`]: {
          fontSize: '12px !important',
          display: 'flex',
          alignItems: 'center',
          padding: '0 3px',
          height: '20px',
        },
        [`& > *`]: {
          marginTop: '4px',
          marginBottom: '4px',
          marginLeft: '2px',
          [`&:first-child`]: {
            marginLeft: 0,
          },
        },
      },
    },
    [`.dn-aux-insertion`]: {
      backgroundColor: 'rgba(24, 144, 255, 1)',
    },
    [`.dn-aux-dashed-box`]: {
      border: '1px dashed rgba(24, 144, 255, 1)',
      [`&-title`]: {
        color: '#333',
      },
    },
    [`.dn-aux-selection-box`]: {
      border: '2px solid rgba(24, 144, 255, 1)',
      position: 'relative',
      pointerEvents: 'none',
      [`&-inner`]: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      [`&-title`]: {
        color: '#333',
      },
    },
    [`.dn-aux-selector`]: {
      [`&-menu`]: {
        marginTop: '-4px',
        animationName: slideToTop,
        animationDuration: '0.2s',
        opacity: 0.8,
        [`button`]: {
          fontSize: '12px !important',
          display: 'flex',
          alignItems: 'center',
          padding: '0 3px',
          height: '20px',
          marginTop: '2px',
        },
      },
    },
    [`.dn-aux-drag-handler`]: {
      cursor: 'move',
    },
    [`.dn-aux-node-resize-handler`]: {
      position: 'absolute',
      width: '10px',
      height: '10px',
      pointerEvents: 'all',
      borderRadius: '10px',
      backgroundColor: '#fff',
      border: `1px solid rgba(24, 144, 255, 1)`,
      [`&.left-center`]: {
        left: 0,
        top: '50%',
        transform: 'translate(calc(-50% - 1px), -50%)',
        cursor: 'ew-resize',
      },
      [`&.right-center`]: {
        left: '100%',
        top: '50%',
        transform: 'translate(calc(-50% + 1px), -50%)',
        cursor: 'ew-resize',
      },
      [`&.center-top`]: {
        left: '50%',
        top: 0,
        transform: 'translate(-50%, calc(-50% - 1px))',
        cursor: 'ns-resize',
      },
      [`&.center-bottom`]: {
        left: '50%',
        top: '100%',
        transform: 'translate(-50%, calc(-50% + 1px))',
        cursor: 'ns-resize',
      },
      [`&.left-top`]: {
        left: 0,
        top: 0,
        transform: 'translate(calc(-50% + 1px), calc(-50% + 1px))',
        cursor: 'nwse-resize',
      },
      [`&.left-bottom`]: {
        left: 0,
        top: '100%',
        transform: 'translate(-50%, -50%)',
        cursor: 'nesw-resize',
      },
      [`&.right-bottom`]: {
        left: '100%',
        top: '100%',
        transform: 'translate(-50%, -50%)',
        cursor: 'nwse-resize',
      },
      [`&.right-top`]: {
        left: '100%',
        top: 0,
        transform: 'translate(-50%, -50%)',
        cursor: 'nesw-resize',
      },
    },
    [`.dn-aux-node-translate-handler`]: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '2px',
      width: '40px',
      height: '20px',
      background: '#1890ff',
      opacity: 0.5,
      pointerEvents: 'all',
    },
    [`.dn-aux-space-block-ruler-indicator`]: {
      position: 'absolute',
      backgroundColor: `rgba(24, 144, 255, 1)`,
      color: '#fff',
      borderRadius: '8px',
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [`span`]: {
        margin: '0 6px',
        display: 'inline-block',
        fontSize: '12px',
      },
    },
    [`.dn-aux-space-block-ruler-h`]: {
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translate(0, -50%)',
      width: '100%',
      height: '12px',
      borderLeft: `1px solid rgba(24, 144, 255, 1)`,
      borderRight: `1px solid rgba(24, 144, 255, 1)`,
      [`&::after`]: {
        content: "' '",
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        transform: 'translate(0, -50%)',
        width: '100%',
        height: '1px',
        backgroundColor: `rgba(24, 144, 255, 1)`,
        zIndex: 1,
      },
      [`.dn-aux-space-block-ruler-indicator `]: {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%) scale(0.7)',
      },
    },
    [`.dn-aux-space-block-ruler-v`]: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translate(-50%, 0)',
      height: '100%',
      width: '12px',
      borderTop: `1px solid rgba(24, 144, 255, 1)`,
      borderBottom: `1px solid rgba(24, 144, 255, 1)`,
      [`&::after`]: {
        content: "''",
        display: 'block',
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translate(-50%, 0)',
        height: '100%',
        width: '1px',
        backgroundColor: `rgba(24, 144, 255, 1)`,
        zIndex: 1,
      },
      [`.dn-aux-space-block-ruler-indicator`]: {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%) scale(0.7)',
      },
    },
  },
  slideToTop,
];
