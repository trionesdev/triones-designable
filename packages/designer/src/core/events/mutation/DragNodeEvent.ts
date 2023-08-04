import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import {ICustomEvent} from "../../../shared";

export class DragNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'drag:node'
}
