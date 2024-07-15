import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genViewportStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      height: '100%',
      width: '100%',
      minHeight: '100px',
      position: 'relative',
      outline: 'none',
      boxSizing: 'border-box',
      userSelect: 'none',
      overflow: 'overlay',
    },
  },
];
