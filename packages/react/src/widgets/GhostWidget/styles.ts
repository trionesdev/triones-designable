import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genGhostWidgetStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      paddingLeft: '25px',
      paddingRight: '15px',
      height: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      color: `#fff`,
      fontSize: '12px',
      zIndex: 9999,
      borderRadius: '50px',
      backgroundColor: `rgba(24, 144, 255, 0.5)`,
      pointerEvents: 'none',
      left: 0,
      top: 0,
      transform: `translate3d(0, 0, 0)`,
    },
  },
];
