import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genReactionsSetterStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      width: `100%`,
      minHeight: '623px',
      overflow: 'hidden',
      [`::-webkit-scrollbar`]: {
        width: '5px',
        height: '5px',
      },
      [`::-webkit-scrollbar-thumb`]: {
        backgroundColor: `rgba(0, 0, 0, 0.2)`,
        borderRadius: 0,
        transition: 'all 0.25s ease-in-out',
      },
      [`::-webkit-scrollbar-thumb:hover`]: {
        backgroundColor: `rgba(0, 0, 0, 0.3)`,
      },
      [`.ant-collapse`]: {
        border: `1px solid ${token.colorBorder}`,
        [`&-header`]: {
          padding: '8px 10px !important',
          backgroundColor: `${token.colorBgContainer}!important`,
          borderBottom: `1px solid ${token.colorBorder} !important`,
          fontWeight: '500 !important',
          [`.ant-collapse-arrow`]: {
            marginRight: '4px !important',
          },
        },
        [`&-item`]: {
          border: `none !important`,
        },
        [`&-content`]: {
          border: `none !important`,
          transition: `none !important`,
        },
        [`&-content-box`]: {
          padding: `12px !important`,
        },
      },
      [`.reaction-runner`]: {
        [`.ant-collapse-content-box`]: {
          padding: `12px 0 !important`,
        },
      },
      [`.reaction-state`]: {
        [`.ant-collapse-content-box`]: {
          padding: `12px 0 !important`,
        },
      },
      [`.dn-field-property-setter`]: {
        display: 'flex',
        height: '300px',
        [`&-coder-wrapper`]: {
          display: 'flex',
          flexGrow: 2,
          height: '100%',
          paddingLeft: '10px',
          position: 'relative',
          flexDirection: 'column',
        },
        [`&-coder-start`]: {
          fontSize: '18px',
          lineHeight: '30px',
          marginBottom: '4px',
          color: token.colorText,
          fontWeight: 300,
          flexGrow: 0,
          opacity: 0.96,
          height: '31px',
        },
        [`&-coder-end`]: {
          fontSize: '18px',
          height: '31px',
          color: token.colorText,
          marginTop: '4px',
          marginBottom: '4px',
          lineHeight: '30px',
          fontWeight: 300,
          flexGrow: 0,
          opacity: 0.96,
        },
        [`&-coder`]: {
          minWidth: 0,
          flexGrow: 2,
          paddingLeft: '10px',
        },
      },
    },
  },
];
