import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import {ICustomEvent} from "../../../shared";

export class UnSelectNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'unselect:node'
}
