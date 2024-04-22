import { FlowEngine, FlowEngineProps } from './models';
import { untracked } from '@formily/reactive';

export const createFlowDesigner = (props: FlowEngineProps<FlowEngine> = {}) => {
  return untracked(() => new FlowEngine({ ...props }));
};
