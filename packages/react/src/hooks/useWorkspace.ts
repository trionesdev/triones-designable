import { useContext } from 'react';
import { useDesigner } from './useDesigner';
import { WorkspaceContext } from '../context';
import { Workspace } from '@trionesdev/designable-core';
import { globalThisPolyfill } from '@trionesdev/designable-shared';

export const useWorkspace = (id?: string): Workspace => {
  const designer = useDesigner();
  const ctxWorkspaceId = useContext(WorkspaceContext)?.id;
  const workspaceId = id || ctxWorkspaceId;
  if (workspaceId) {
    return designer.workbench.findWorkspaceById(workspaceId);
  }
  if (globalThisPolyfill['__DESIGNABLE_WORKSPACE__'])
    return globalThisPolyfill['__DESIGNABLE_WORKSPACE__'];
  return designer.workbench.currentWorkspace;
};
