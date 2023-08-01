import {observable} from "@formily/reactive";
import {IDesignerBehaviorStore, IDesignerIconsStore, IDesignerLocaleStore} from "./types";

const DESIGNER_BEHAVIORS_STORE: IDesignerBehaviorStore = observable.ref([])

const DESIGNER_ICONS_STORE: IDesignerIconsStore = observable.ref({})

const DESIGNER_LOCALES_STORE: IDesignerLocaleStore = observable.ref({})