import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genColorInputStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      width: '100%',
      [`.ant-popover-inner-content`]: {
        padding: '0 !important',
        userSelect: 'none',
      },
      [`&-color-tips`]: {
        width: '20px',
        height: '20px',
        borderRadius: '2px',
        border: `1px solid ${token.colorBorder}`,
        cursor: 'pointer',
      },
    },
  },
];
