import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genCollapseItemStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      flexWrap: 'wrap',
      [`&-header`]: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 20px',
        margin: '-1px -20px 0 -20px',
        color: token.colorText,
        borderTop: `1px solid ${token.colorBorder}`,
        borderBottom: `1px solid ${token.colorBorder}`,
        backgroundColor: '#eee',
        cursor: 'pointer',
        transition: 'all 0.25s ease-in-out',
        fontSize: '13px',
        [`&-expand`]: {
          marginLeft: `-13px`,
          transform: `rotate(-90deg)`,
          fontSize: '12px',
          transition: 'all 0.15s ease-in-out',
          marginRight: '3px',
        },
      },
      [`&-content`]: {
        display: 'none',
        width: '100%',
        paddingTop: '4px',
        [`& > div:last-child`]: {
          borderBottom: `none !important`,
        },
      },
      [`&.expand`]: {
        [`.dn-collapse-item-content`]: {
          display: `block`,
        },
        [`.dn-collapse-item-header-expand`]: {
          transform: `rotate(0)`,
        },
      },
    },
  },
];
