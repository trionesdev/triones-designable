import React, { useState } from 'react';
import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';
import { observer, useField } from '@formily/react';
import { IconWidget, useCssInJs } from '@trionesdev/designable-react';
import cls from 'classnames';

export const genCollapseItemStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => {
  const prefix = 'af';
  return {
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
        [`.${prefix}-collapse-item-content`]: {
          display: `block`,
        },
        [`.${prefix}-collapse-item-header-expand`]: {
          transform: `rotate(0)`,
        },
      },
    },
  };
};

export interface ICollapseItemProps {
  className?: string;
  style?: React.CSSProperties;
  defaultExpand?: boolean;
}

export const CollapseItem: React.FC<ICollapseItemProps> = observer((props) => {
  const prefix = 'af-collapse-item';
  const { hashId, wrapSSR } = useCssInJs({
    prefix,
    styleFun: genCollapseItemStyle,
  });
  const field = useField();
  const [expand, setExpand] = useState(props.defaultExpand ?? true);

  return wrapSSR(
    <div
      className={cls(prefix, props.className, { expand }, hashId)}
      style={props.style}
    >
      <div
        className={cls(prefix + '-header', hashId)}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setExpand(!expand);
        }}
      >
        <div className={cls(prefix + '-header-expand', hashId)}>
          <IconWidget infer="Expand" size={10} />
        </div>
        <div className={cls(prefix + '-header-content', hashId)}>
          {field.title}
        </div>
      </div>
      <div className={cls(prefix + '-content', hashId)}>{props.children}</div>
    </div>,
  );
});
