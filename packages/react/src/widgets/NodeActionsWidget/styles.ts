import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genNodeActionsWidgetStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      overflow: 'hidden',
      paddingTop: '8px',
      paddingBottom: '8px',
      [`&-content`]: {
        position: 'relative',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        lineHeight: 1,
        [`&::before`]: {
          position: 'absolute',
          content: "''",
          display: 'block',
          height: 0,
          width: '300%',
          top: '50%',
          borderBottom: `1px dashed ${token.colorBorder}`,
          right: '100%',
        },
        [`&::after`]: {
          position: 'absolute',
          content: "''",
          display: 'block',
          height: 0,
          width: '300%',
          top: '50%',
          borderBottom: `1px dashed ${token.colorBorder}`,
          left: '100%',
        },
        [`a`]: {
          color: token.colorTextSecondary,
          [`&:hover`]: {
            color: token.colorPrimary,
          },
        },
      },
      [`&-item`]: {
        [`&-text`]: {
          fontSize: '10px',
          display: 'flex',
          alignItems: 'center',
          lineHeight: 1,
          [`.dn-icon`]: {
            marginRight: `6px`,
          },
        },
      },
    },
  },
];
