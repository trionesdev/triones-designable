import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genNodePathWidgetStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      padding: '4px 10px !important',
      borderBottom: `1px solid ${token.colorBorder}`,
      [`.dn-icon`]: {
        fontSize: '11px',
      },
      [`.ant-breadcrumb-separator`]: {
        margin: `0 4px !important`,
      },
      [`a`]: {
        fontSize: `12px`,
      },
    },
  },
];
