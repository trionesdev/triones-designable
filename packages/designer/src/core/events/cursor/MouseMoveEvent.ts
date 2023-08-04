import { AbstractCursorEvent } from './AbstractCursorEvent'
import {ICustomEvent} from "../../../shared";

export class MouseMoveEvent
  extends AbstractCursorEvent
  implements ICustomEvent
{
  type = 'mouse:move'
}
