import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genSizeInputStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      display: 'flex',
      width: '100%',
      [`.ant-input-number`]: {
        flexGrow: 2,
        marginRight: '2px',
      },
      [`&-unit`]: {
        border: `1px solid ${token.colorBorder}`,
        borderRadius: '2px',
        cursor: 'pointer',
        height: '32px',
        padding: '0 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 0,
      },
    },
  },
];
