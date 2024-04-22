import { Graph } from '@antv/x6';
import { Form, onFieldInputValueChange } from '@formily/core';
import _ from 'lodash';

let timeRequest = null;
export const effectSave = (form: Form, graph: Graph, cellId: string) => {
  onFieldInputValueChange('*', () => {
    clearTimeout(timeRequest);
    timeRequest = setTimeout(() => {
      const cell = graph.getCellById(cellId);
      form.submit().then((values) => {
        if (cell.isNode()) {
          cell.setData({
            ...cell.getData(),
            props: _.merge(
              {},
              cell.getData().props,
              _.get(values, 'x-component-props'),
            ), //merge props的时候 一定要把target 设置一个空对象，否则不会触发graph的更新
          });
        }
      });
    }, 500);
  });
};
