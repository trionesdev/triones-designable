import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import {ICustomEvent} from "../../../shared";

export class InsertChildrenEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'insert:children'
}
