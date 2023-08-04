import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import {ICustomEvent} from "../../../shared";

export class UpdateNodePropsEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'update:node:props'
}
