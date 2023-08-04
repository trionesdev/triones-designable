import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent'
import {ICustomEvent} from "../../../shared";

export class RemoveWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent
{
  type = 'remove:workspace'
}
