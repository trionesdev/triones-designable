import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import {ICustomEvent} from "../../../shared";

export class InsertAfterEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'insert:after'
}
