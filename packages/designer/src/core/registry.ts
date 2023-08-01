import {observable} from "@formily/reactive";
import {IBehavior, IBehaviorLike, IDesignerBehaviorStore, IDesignerIconsStore, IDesignerLocaleStore} from "./types";
import {isBehaviorHost, isBehaviorList} from "./externals";
import {TreeNode} from "./models";

const DESIGNER_BEHAVIORS_STORE: IDesignerBehaviorStore = observable.ref([])

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
}

export type IDesignerRegistry = typeof DESIGNER_GlobalRegistry

export const GlobalRegistry: IDesignerRegistry = DESIGNER_GlobalRegistry