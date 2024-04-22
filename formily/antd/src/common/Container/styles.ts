import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genContainerStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => {
  return {
    [`.${prefixCls}`]: {
      margin: '0 !important',
      padding: '20px',
      border: `1px solid ${token.colorBorder}`,
    },
  };
};
