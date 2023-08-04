
import { AbstractCursorEvent } from './AbstractCursorEvent'
import {ICustomEvent} from "../../../shared";

export class DragMoveEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'drag:move'
}
