import { useFlowDesigner } from './useFlowDesigner';
import { FlowViewport } from '../models/FlowViewport';

export const useFlowViewport = (): FlowViewport => {
  return useFlowDesigner().viewport;
};
