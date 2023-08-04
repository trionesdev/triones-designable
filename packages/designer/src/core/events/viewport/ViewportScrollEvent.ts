import { AbstractViewportEvent } from './AbstractViewportEvent'
import {ICustomEvent} from "../../../shared";

export class ViewportScrollEvent
  extends AbstractViewportEvent
  implements ICustomEvent
{
  type = 'viewport:scroll'
}
