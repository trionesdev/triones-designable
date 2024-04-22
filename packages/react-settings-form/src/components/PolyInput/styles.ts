import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genPolyInputStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      [`&-content`]: {
        flexGrow: 2,
        marginRight: '2px',
        display: 'flex',
        [`.ant-select`]: {
          width: '100%',
        },
        [`.ant-input-number`]: {
          width: '100%',
        },
      },
      [`&-controller`]: {
        border: `1px solid ${token.colorBorder}`,
        // borderRadius: '2px',
        cursor: 'pointer',
        padding: '0 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 0,
      },
    },
  },
];
