import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genEmptyWidgetStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      transform: 'perspective(1px) translate3d(0, 0, 0)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: '100%',
      width: '100%',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `#fff`,
      [`.animations`]: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      [`.hotkeys-list`]: {
        textAlign: 'center',
        lineHeight: '30px',
        color: '#888',
      },
    },
  },
];
