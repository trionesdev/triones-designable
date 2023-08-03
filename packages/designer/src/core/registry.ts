import {observable} from "@formily/reactive";
import {
    IBehavior,
    IBehaviorLike,
    IDesignerBehaviors,
    IDesignerBehaviorStore, IDesignerIcons,
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

    getDesignerIcon: (name: string) => {
        // @ts-ignore
        return DESIGNER_ICONS_STORE[name];
    },

    getDesignerBehaviors: (node: TreeNode): IBehavior[] => {
        return []
    },

    registerDesignerIcons: (map: IDesignerIcons) => {
        debugger
        Object.assign(DESIGNER_ICONS_STORE, map)
    },

    registerDesignerBehaviors: (...packages: IDesignerBehaviors[]) => {
        _.forEach(packages, (sources, key) => {
            _.forEach(sources, (source, key) => {
                _.forEach(source.Behavior, (behavior) => {
                    DESIGNER_BEHAVIORS_STORE.value.set(behavior.name, behavior)
                })
            })
        })
    },
}

export type IDesignerRegistry = typeof DESIGNER_GlobalRegistry

export const GlobalRegistry: IDesignerRegistry = DESIGNER_GlobalRegistry