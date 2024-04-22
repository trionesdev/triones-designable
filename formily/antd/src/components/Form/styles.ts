import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genFormStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => {
  const antPrefix = 'ant';
  return {
    [`.${prefixCls}`]: {
      [`
            .${antPrefix}-input,
            .${antPrefix}-input-number,
            .${antPrefix}-input-affix-wrapper,
            .${antPrefix}-cascader-picker,
            .${antPrefix}-picker-input,
            .${antPrefix}-picker,
            .${antPrefix}-cascader-picker-label,
            .${antPrefix}-slider,
            .${antPrefix}-checkbox,
            .${antPrefix}-rate,
            .${antPrefix}-switch,
            .${antPrefix}-radio,
            .${antPrefix}-radio-wrapper,
            .${antPrefix}-checkbox-group,
            .${antPrefix}-checkbox-wrapper,
            .${antPrefix}-radio-group,
            .${antPrefix}-upload,
            .${antPrefix}-transfer,
            .${antPrefix}-select,
            .${antPrefix}-select-selector
            `]: {
        pointerEvents: `none`,
        [`input`]: {
          pointerEvents: `none`,
        },
      },
      [`.anticon svg `]: {
        pointerEvents: 'none',
      },
    },
  };
};
