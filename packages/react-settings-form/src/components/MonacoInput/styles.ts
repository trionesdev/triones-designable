import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genMonacoInputStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      position: 'relative',
      transition: 'all 0.15s ease-in-out',
      width: '100%',
      height: '100%',
      opacity: 0,
      display: 'flex',
      [`&.loaded`]: {
        opacity: 1,
      },
      [`&-view`]: {
        flexGrow: 2,
        height: '100%',
      },
      [`&-helper`]: {
        position: 'absolute',
        bottom: '10px',
        right: '5%',
        zIndex: 2,
      },
      [`.monaco-error-highline`]: {
        left: '0px !important',
        width: '5px !important',
        height: '5px !important',
        background: 'red !important',
        borderRadius: '100% !important',
        transform: 'translate(35px, 5px) !important',
      },
    },
  },
];
