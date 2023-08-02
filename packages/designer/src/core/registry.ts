import {observable} from "@formily/reactive";
import {
    IBehavior,
    IBehaviorLike,
    IDesignerBehaviors,
    IDesignerBehaviorStore,
    IDesignerIconsStore,
    IDesignerLocaleStore
} from "./types";
import {isBehaviorHost, isBehaviorList} from "./externals";
import {TreeNode} from "./models";
import _ from "lodash";


const DESIGNER_BEHAVIORS_STORE: IDesignerBehaviorStore = observable.ref(new Map())

const DESIGNER_ICONS_STORE: IDesignerIconsStore = observable.ref({})

const DESIGNER_LOCALES_STORE: IDesignerLocaleStore = observable.ref({})

const DESIGNER_GlobalRegistry = {

    setDesignerBehaviors: (behaviors: IBehaviorLike[]) => {

    },
    getDesignerBehaviors: (node: TreeNode) => {

    },

    registerDesignerBehaviors: (...packages: IDesignerBehaviors[]) => {
        _.forEach(packages,(sources,key)=>{
            debugger
            _.forEach(sources,(source,key)=>{
                _.forEach(source.Behavior,(behavior)=>{
                    DESIGNER_BEHAVIORS_STORE.value.set(behavior.name,behavior)
                })
            })
        })
    },
}

export type IDesignerRegistry = typeof DESIGNER_GlobalRegistry

export const GlobalRegistry: IDesignerRegistry = DESIGNER_GlobalRegistry