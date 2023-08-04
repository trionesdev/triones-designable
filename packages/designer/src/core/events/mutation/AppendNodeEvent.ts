import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import {ICustomEvent} from "../../../shared";

export class AppendNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'append:node'
}
