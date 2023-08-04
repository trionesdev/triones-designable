import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import {ICustomEvent} from "../../../shared";

export class WrapNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'wrap:node'
}
