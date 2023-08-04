import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import {ICustomEvent} from "../../../shared";

export class PrependNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'prepend:node'
}
