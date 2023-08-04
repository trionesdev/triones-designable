import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import {ICustomEvent} from "../../../shared";

export class DropNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'drop:node'
}
