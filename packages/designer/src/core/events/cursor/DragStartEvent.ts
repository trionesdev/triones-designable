import { AbstractCursorEvent } from './AbstractCursorEvent'
import {ICustomEvent} from "../../../shared";

export class DragStartEvent
  extends AbstractCursorEvent
  implements ICustomEvent
{
  type = 'drag:start'
}
