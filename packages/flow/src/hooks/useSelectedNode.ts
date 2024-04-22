import { useFlowViewport } from './useFlowViewport';

export const useSelectedNode = () => {
  return useFlowViewport().selectedNode;
};
