import { CSSInterpolation, Keyframes } from '@ant-design/cssinjs';
import { GlobalToken } from 'antd';

const fadeIn = new Keyframes('fadeIn', {
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const slideInRight = new Keyframes('slideInRight', {
  '0%': {
    transform: 'translateX(100%)',
  },
  '100%': {
    transform: 'translateX(0)',
  },
});

const slideOutRight = new Keyframes('slideOutRight', {
  '0%': {
    transform: 'translateX(0)',
  },
  '100%': {
    transform: 'translateX(100%)',
  },
});

export const genSettingsFormStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      padding: '0 20px',
      [`&-wrapper`]: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        [`.dn-node-path`]: {
          flexGrow: 0,
        },

        [`.ant-formily-item`]: {
          paddingBottom: '8px',
          marginBottom: '8px',
          marginTop: '8px',
          borderBottom: `1px solid ${token.colorBorder}`,
          [`*`]: {
            fontSize: '13px',
          },
          [`.ant-formily-item-control-content-component`]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            [`& > .ant-radio-group`]: {
              display: 'flex !important',
              width: '100%',
              [`.ant-radio-button-wrapper`]: {
                display: 'flex',
                justifyContent: 'center',
                padding: '0 6px !important',
                alignItems: 'center',
                flexGrow: 2,
              },
            },
            [`& > .ant-slider`]: {
              flexShrink: 0,
              minWidth: 0,
              width: '100%',
            },
            [`& > .ant-select`]: {
              maxWidth: '140px',
            },
          },
        },
      },
      [`&-content`]: {
        flexGrow: 1,
        overflow: 'overlay',
      },
      [`&-empty`]: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        color: '#888',
      },
    },
  },
  {
    [`.animate__fadeInUp`]: {
      animationName: fadeIn,
    },
    [`.animate__slideInRight`]: {
      animationName: slideInRight,
    },
    [`.animate__slideOutRight`]: {
      animationName: slideOutRight,
    },
    [`.animate__animated`]: {
      animationDelay: '0ms',
      animationDuration: '0.25s',
      animationFillMode: 'forwards',
    },
  },
  fadeIn,
  slideInRight,
  slideOutRight,
];
