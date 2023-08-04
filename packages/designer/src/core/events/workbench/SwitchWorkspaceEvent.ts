import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent'
import {ICustomEvent} from "../../../shared";

export class SwitchWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent
{
  type = 'switch:workspace'
}
