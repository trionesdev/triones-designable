import {
    Engine,
    IEngineProps, useContentEditableEffect,
    useCursorEffect,
    useFreeSelectionEffect, useKeyboardEffect, useResizeEffect,
    useSelectionEffect, useTranslateEffect,
    useViewportEffect, useWorkspaceEffect
} from "@alkaid/core";
import {untracked} from "@formily/reactive";
import {Presets} from "@alkaid/core";
import {
    useAutoScrollEffect
} from "@alkaid/core";
import {useDragDropEffect} from "./effects";
import {GraphEngine} from "./context";

export const DEFAULT_EFFECTS = [
    useAutoScrollEffect,
    useDragDropEffect,
    useFreeSelectionEffect,
    useCursorEffect,
    useViewportEffect,
    useSelectionEffect,
    useKeyboardEffect,
    useWorkspaceEffect,
    useContentEditableEffect,
    useTranslateEffect,
    useResizeEffect,
]

export const createFlowDesigner = (props: IEngineProps<Engine> = {}) => {
    const drivers = props.drivers || []
    const effects = props.effects || []
    const shortcuts = props.shortcuts || []
    return untracked(
        () =>
            new GraphEngine({
                ...props,
                effects: [...effects, ...DEFAULT_EFFECTS],
                drivers: [...drivers, ...Presets.DEFAULT_DRIVERS],
                shortcuts: [...shortcuts, ...Presets.DEFAULT_SHORTCUTS],
            })
    )
}
