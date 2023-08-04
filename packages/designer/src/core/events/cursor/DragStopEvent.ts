import { AbstractCursorEvent } from './AbstractCursorEvent'
import {ICustomEvent} from "../../../shared";

export class DragStopEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'drag:stop'
}
