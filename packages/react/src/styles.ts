import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genAppStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.dn-app`]: {
      [`::-webkit-scrollbar`]: {
        width: '5px',
        height: '5px',
      },
      [`::-webkit-scrollbar-thumb`]: {
        backgroundColor: `#d9d9d9`,
        borderRadius: 0,
        transition: 'all 0.25s ease-in-out',
      },
      [`::-webkit-scrollbar-thumb:hover`]: {
        backgroundColor: '#f0f0f0',
      },
      color: '#222',
      fontSize: '14px',
      fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
      fontVariant: 'tabular-nums',
      lineHeight: 1.5715,
      fontFeatureSettings: 'tnum',
      [`*`]: {
        boxSizing: 'border-box',
      },
      [`*[contenteditable='true']`]: {
        minWidth: '1px',
        minHeight: '14px',
        cursor: 'text !important',
        outline: 'none !important',
      },
      [`*[data-content-editable]:not(*[contenteditable='true'])`]: {
        [`&:empty::before`]: {
          content: 'Please Input',
          display: 'block',
          opacity: 0.6,
        },
        [`&:hover`]: {
          cursor: 'text !important',
          opacity: 0.8,
        },
      },
    },
  },
];
