import { createSchemaField } from '@formily/react';
import {
  ArrayItems,
  ArrayTable,
  DatePicker,
  FormCollapse,
  FormGrid,
  FormItem,
  FormLayout,
  FormTab,
  Input,
  NumberPicker,
  Radio,
  Select,
  Space,
  Switch,
  TimePicker,
} from '@formily/antd-v5';
import { CollapseItem } from './components';
import { Slider } from 'antd';

export const SchemaField:any = createSchemaField({
  components: {
    FormItem,
    CollapseItem,
    Input,
    NumberPicker,
    DatePicker,
    TimePicker,
    Select,
    Radio,
    Slider,
    Switch,
    Space,
    ArrayItems,
    ArrayTable,
    FormCollapse,
    FormGrid,
    FormLayout,
    FormTab,
  },
});
