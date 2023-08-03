import {Engine} from "./Engine";
import {Workspace} from "./Workspace";

export class Workbench {
    engine: Engine
    workspace:Workspace
    constructor(engine:Engine) {
        this.engine = engine
        this.workspace = new Workspace(engine)
    }
}