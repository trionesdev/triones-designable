import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genResourceWidgetStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      flexWrap: 'wrap',
      overflow: 'hidden',
      [`&-header`]: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 8px',
        color: '#333',
        borderBottom: `1px solid #d9d9d9`,
        backgroundColor: `#eee`,
        cursor: 'pointer',
        transition: 'all 0.25s ease-in-out',
        fontSize: '13px',
        [`&-expand`]: {
          transform: 'rotate(-90deg)',
          fontSize: '12px',
          transition: 'all 0.15s ease-in-out',
          marginRight: '3px',
        },
      },
      [`&-content-wrapper`]: {
        display: 'flex',
        justifyContent: 'center',
        background: '#fff',
      },
      [`&-content`]: {
        width: '100%',
        // display: 'flex',
        flexWrap: 'wrap',
        display: 'none',
      },
      [`&.expand`]: {
        [`.dn-resource-content`]: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 50%)',
          gridGap: '1px',
          backgroundColor: '#d9d9d9',
          borderBottom: `1px solid #d9d9d9`,
        },
        [`.dn-resource-header-expand`]: {
          transform: 'rotate(0)',
        },
      },
      [`&-item`]: {
        position: 'relative',
        userSelect: 'none',
        background: '#fff',
        minHeight: '40px',
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        cursor: 'grab',
        transition: 'color 0.1s ease-out',
        [`&:hover`]: {
          color: `rgba(24, 144, 255, 1)`,
          boxShadow: ' 0 0 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1,
        },
        [`&-icon`]: {
          margin: '12px 8px',
        },
        [`&-text`]: {
          flex: '1 auto',
          // textAlign: 'center',
          fontSize: '12px',
          lineHeight: 1,
          // marginBottom: '12px'
        },
        [`&-remain`]: {
          background: '#fff',
        },
      },
    },
  },
];
