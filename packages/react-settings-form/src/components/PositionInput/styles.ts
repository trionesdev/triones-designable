import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genPositionInputStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      display: 'flex',
      flexDirection: 'column',
      [`&-row`]: {
        display: 'flex',
        justifyContent: 'center',
      },
      [`&-cell`]: {
        width: '26px',
        height: '26px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: '3px',
        // color: 'rgba(0, 0, 0, 0.6)',
        margin: '5px',
        color: token.colorText,
      },
    },
  },
];
