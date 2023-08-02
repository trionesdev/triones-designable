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

const reSortBehaviors = (target: IBehavior[], sources: IDesignerBehaviors) => {
    const findTargetBehavior = (behavior: IBehavior) => target.includes(behavior)
    const findSourceBehavior = (name: string) => {
        for (let key in sources) {
            const { Behavior } = sources[key]
            if (Behavior){
                for (let i = 0; i < Behavior.length; i++) {
                    if (Behavior[i].name === name) return Behavior[i]
                }
            }
        }
    }
    _.each(sources, (item) => {
        if (!item) return
        if (!isBehaviorHost(item)) return
        const { Behavior } = item
        _.each(Behavior, (behavior) => {
            if (findTargetBehavior(behavior)) return
            const name = behavior.name
            _.each(behavior.extends, (dep) => {
                const behavior = findSourceBehavior(dep)
                if (!behavior)
                    throw new Error(`No ${dep} behavior that ${name} depends on`)
                if (!findTargetBehavior(behavior)) {
                    target.unshift(behavior)
                }
            })
            target.push(behavior)
        })
    })
}

const DESIGNER_BEHAVIORS_STORE: IDesignerBehaviorStore = observable.ref(new Map())

const DESIGNER_ICONS_STORE: IDesignerIconsStore = observable.ref({})

const DESIGNER_LOCALES_STORE: IDesignerLocaleStore = observable.ref({})

const DESIGNER_GlobalRegistry = {

    setDesignerBehaviors: (behaviors: IBehaviorLike[]) => {
        DESIGNER_BEHAVIORS_STORE.value = behaviors.reduce<IBehavior[]>(
            (buf, behavior) => {
                if (isBehaviorHost(behavior)) {
                    return buf.concat(behavior.Behavior!)
                } else if (isBehaviorList(behavior)) {
                    return buf.concat(behavior)
                }
                return buf
            },
            []
        )
    },
    getDesignerBehaviors: (node: TreeNode) => {
        return DESIGNER_BEHAVIORS_STORE.value.filter((pattern) =>
            pattern.selector(node)
        )
    },

    registerDesignerBehaviors: (...packages: IDesignerBehaviors[]) => {
        const results: IBehavior[] = []
        packages.forEach((sources) => {
            reSortBehaviors(results, sources)
        })
        if (results.length) {
            DESIGNER_BEHAVIORS_STORE.value = results
        }
    },
}

export type IDesignerRegistry = typeof DESIGNER_GlobalRegistry

export const GlobalRegistry: IDesignerRegistry = DESIGNER_GlobalRegistry