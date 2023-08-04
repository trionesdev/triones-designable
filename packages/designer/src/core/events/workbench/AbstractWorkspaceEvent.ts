
import { IEngineContext } from '../../types'
import {Workspace} from "../../models";

export class AbstractWorkspaceEvent {
  data: Workspace
  context: IEngineContext
  constructor(data: Workspace) {
    this.data = data
  }
}
