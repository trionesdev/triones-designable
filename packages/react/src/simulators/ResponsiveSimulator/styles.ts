import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genResponsiveSimulatorStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      backgroundColor: '#fff',
    },
    [`.dn-resize-handle`]: {
      position: 'absolute',
      transition: '0.2s all ease-in-out',
      boxSizing: 'border-box',
      userSelect: 'none',
      bottom: 0,
      zIndex: 10,
      background: '#eee',
      color: '#444',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [`&-RESIZE_WIDTH`]: {
        top: 0,
        bottom: '15px',
        cursor: 'ew-resize',
        [`svg`]: {
          transformOrigin: 'center',
          transform: 'rotate(-90deg)',
        },
      },
      [`&-RESIZE_HEIGHT`]: {
        left: 0,
        right: '15px',
        cursor: 'ns-resize',
      },
      [`&-RESIZE`]: {
        cursor: 'nwse-resize',
      },
      [`&-RESIZE_HEIGHT,&-RESIZE`]: {
        height: '15px',
      },
      [`&-RESIZE_WIDTH,&-RESIZE`]: {
        right: 0,
        width: '15px',
      },
      [`&:hover`]: {
        background: '#f0f0f0',
        color: '#666',
      },
    },
  },
];
