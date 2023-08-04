import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import {ICustomEvent} from "../../../shared";

export class RemoveNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'remove:node'
}
