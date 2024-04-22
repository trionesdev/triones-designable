import React, { useState, useEffect } from 'react';
import { useCssInJs, usePrefix } from '@trionesdev/designable-react';
import cls from 'classnames';
import { genPositionInputStyle } from './styles';
// import './styles.less'

export interface IPositionInputProps {
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: (value: string) => void;
}

export const PositionInput: React.FC<IPositionInputProps> = (props) => {
  const prefix = usePrefix('position-input');
  const [current, setCurrent] = useState(props.value);
  useEffect(() => {
    if (!props.value) {
      setCurrent('center');
    }
  }, [props.value]);
  const createCellProps = (type: string) => ({
    className: cls(prefix + '-cell', { active: current === type }, hashId),
    onClick() {
      setCurrent(type);
      props.onChange?.(type);
    },
  });
  const { hashId } = useCssInJs({ prefix, styleFun: genPositionInputStyle });
  return (
    <div className={cls(prefix, props.className, hashId)} style={props.style}>
      <div className={cls(prefix + '-row', hashId)}>
        <div {...createCellProps('top')}>┳</div>
      </div>
      <div className={cls(prefix + '-row', hashId)}>
        <div {...createCellProps('left')}>┣</div>
        <div {...createCellProps('center')}>╋</div>
        <div {...createCellProps('right')}>┫</div>
      </div>
      <div className={cls(prefix + '-row', hashId)}>
        <div {...createCellProps('bottom')}>┻</div>
      </div>
    </div>
  );
};
