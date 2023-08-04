import {DragDropDriver} from "./drivers";
import {useDragDropEffect} from "./effects";
import {MouseMoveDriver} from "./drivers/MouseMoveDriver";
import {useCursorEffect} from "./effects";

export const DEFAULT_EFFECTS = [
    useDragDropEffect,
    useCursorEffect
]

export const DEFAULT_DRIVERS = [
    DragDropDriver,
    MouseMoveDriver
]