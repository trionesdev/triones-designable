import React, { useRef } from 'react';
import { Input, Popover } from 'antd';
import { useCssInJs, usePrefix } from '@trionesdev/designable-react';
import { SketchPicker } from 'react-color';
import cls from 'classnames';
import { genColorInputStyle } from './styles';

export interface IColorInputProps {
  value?: string;
  onChange?: (color: string) => void;
}

export const ColorInput: React.FC<IColorInputProps> = (props) => {
  const container = useRef<HTMLDivElement>();
  const prefix = usePrefix('color-input');
  const color = props.value as string;
  const { hashId } = useCssInJs({ prefix, styleFun: genColorInputStyle });
  return (
    <div ref={container} className={cls(prefix, hashId)}>
      <Input
        value={props.value}
        onChange={(e) => {
          props.onChange?.(e.target.value);
        }}
        placeholder="Color"
        prefix={
          <Popover
            autoAdjustOverflow
            trigger="click"
            overlayInnerStyle={{ padding: 0 }}
            getPopupContainer={() => container.current}
            content={
              <SketchPicker
                color={color}
                onChange={({ rgb }) => {
                  props.onChange?.(`rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`);
                }}
              />
            }
          >
            <div
              className={cls(prefix + '-color-tips', hashId)}
              style={{
                backgroundColor: color,
              }}
            ></div>
          </Popover>
        }
      />
    </div>
  );
};
