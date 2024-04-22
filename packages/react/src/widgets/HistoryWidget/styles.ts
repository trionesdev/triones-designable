import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genHistoryWidgetStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      [`&-item`]: {
        display: 'flex',
        justifyContent: `space-between`,
        minHeight: '32px',
        padding: '0 10px',
        alignItems: 'center',
        cursor: 'pointer',
        color: '#333',
        [`&-timestamp`]: {
          fontSize: '10px',
        },
        [`&:hover`]: {
          backgroundColor: '#eee',
        },
        [`&.active`]: {
          backgroundColor: '#eee',
        },
      },
    },
  },
];
