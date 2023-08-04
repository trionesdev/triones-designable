import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent'
import {ICustomEvent} from "../../../shared";
export class AddWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent
{
  type = 'add:workspace'
}
