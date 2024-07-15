import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genFormGridStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => {
  return {
    [`.${prefixCls}`]: {
      margin: '4px',
      minHeight: '60px',
      border: `1px dashed #aaa`,
    },
  };
};
