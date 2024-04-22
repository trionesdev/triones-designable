import React from 'react';
import { observer } from '@formily/reactive-react';
import { useWorkbench } from '../hooks';
import { Workspace } from './Workspace';
type WorkbenchProps = {
  children?: React.ReactNode;
};
export const Workbench: React.FC<WorkbenchProps> = observer((props) => {
  const workbench = useWorkbench();
  return (
    <Workspace id={workbench.currentWorkspace?.id}>{props.children}</Workspace>
  );
});
