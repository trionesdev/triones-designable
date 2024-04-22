import React from 'react';
import { useField, Field, observer } from '@formily/react';
import { Field as FieldType } from '@formily/core';
import { FormItem } from '@formily/antd-v5';
import { Radio } from 'antd';
import {
  usePrefix,
  IconWidget,
  useCssInJs,
} from '@trionesdev/designable-react';
import { FlexStyleSetter } from '../FlexStyleSetter';
import cls from 'classnames';
import { genDisplayStyleSetterStyle } from './styles';

// import './styles.less'
export interface IDisplayStyleSetterProps {
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: (value: string) => void;
}

export const DisplayStyleSetter: React.FC<IDisplayStyleSetterProps> = observer(
  (props) => {
    const field = useField<FieldType>();
    const prefix = usePrefix('display-style-setter');
    const { hashId, wrapSSR } = useCssInJs({
      prefix,
      styleFun: genDisplayStyleSetterStyle,
    });
    return wrapSSR(
      <>
        <FormItem.BaseItem
          label={field.title}
          className={cls(prefix, props.className, hashId)}
          style={props.style}
        >
          <Radio.Group
            className={cls(prefix + '-radio', hashId)}
            options={[
              {
                label: <IconWidget infer="DisplayBlock" size={16} />,
                value: 'block',
              },
              {
                label: <IconWidget infer="DisplayInlineBlock" size={16} />,
                value: 'inline-block',
              },
              {
                label: <IconWidget infer="DisplayInline" size={16} />,
                value: 'inline',
              },
              {
                label: <IconWidget infer="DisplayFlex" size={16} />,
                value: 'flex',
              },
            ]}
            value={props.value}
            onChange={(e) => {
              props.onChange?.(e.target.value);
            }}
            optionType="button"
          />
        </FormItem.BaseItem>
        <Field
          name="flex"
          basePath={field.address.parent()}
          visible={false}
          reactions={(flexField) => {
            flexField.visible = field.value === 'flex';
          }}
          component={[FlexStyleSetter]}
        />
      </>,
    );
  },
);
