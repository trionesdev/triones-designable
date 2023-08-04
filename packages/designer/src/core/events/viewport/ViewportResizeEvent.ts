import { AbstractViewportEvent } from './AbstractViewportEvent'
import {ICustomEvent} from "../../../shared";

export class ViewportResizeEvent
  extends AbstractViewportEvent
  implements ICustomEvent
{
  type = 'viewport:resize'
}
