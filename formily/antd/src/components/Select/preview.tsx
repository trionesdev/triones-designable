import React from 'react';
import { Select as FormilySelect } from '@formily/antd-v5';
import { createBehavior, createResource } from '@trionesdev/designable-core';
import { DnFC } from '@trionesdev/designable-react';
import { createFieldSchema } from '../Field';
import { AllSchemas } from '../../schemas';
import { AllLocales } from '../../locales';

export const Select: DnFC<React.ComponentProps<typeof FormilySelect>> =
  FormilySelect;

Select.Behavior = createBehavior({
  name: 'Select',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Select',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Select),
  },
  designerLocales: AllLocales.Select,
});

Select.Resource = createResource({
  icon: 'SelectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: 'Select',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
      },
    },
  ],
});
