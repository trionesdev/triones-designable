import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import {ICustomEvent} from "../../../shared";

export class CloneNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'clone:node'
}
