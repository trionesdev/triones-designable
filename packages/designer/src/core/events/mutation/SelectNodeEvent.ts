import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import {ICustomEvent} from "../../../shared";

export class SelectNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'select:node'
}
