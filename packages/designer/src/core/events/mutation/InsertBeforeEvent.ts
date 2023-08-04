import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import {ICustomEvent} from "../../../shared";

export class InsertBeforeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'insert:before'
}
