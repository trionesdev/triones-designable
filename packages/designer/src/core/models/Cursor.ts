import {Engine} from "./Engine";
import {globalThisPolyfill} from "../../shared";
import {action, define, observable} from "@formily/reactive";

export enum CursorStatus {
    Normal = 'NORMAL',
    DragStart = 'DRAG_START',
    Dragging = 'DRAGGING',
    DragStop = 'DRAG_STOP',
}

export enum CursorDragType {
    Move = 'MOVE',
    Resize = 'RESIZE',
    Rotate = 'ROTATE',
    Scale = 'SCALE',
    Translate = 'TRANSLATE',
    Round = 'ROUND',
}

export enum CursorType {
    Normal = 'NORMAL',
    Selection = 'SELECTION',
    Sketch = 'SKETCH',
}

export interface ICursorPosition {
    pageX?: number

    pageY?: number

    clientX?: number

    clientY?: number

    topPageX?: number

    topPageY?: number

    topClientX?: number

    topClientY?: number
}

const DEFAULT_POSITION = {
    pageX: 0,
    pageY: 0,
    clientX: 0,
    clientY: 0,
    topPageX: 0,
    topPageY: 0,
    topClientX: 0,
    topClientY: 0,
}

export class Cursor {
    engine: Engine
    type: CursorType | string = CursorType.Normal

    dragType: CursorDragType | string = CursorDragType.Move

    status: CursorStatus = CursorStatus.Normal

    position: ICursorPosition = DEFAULT_POSITION

    dragStartPosition: ICursorPosition

    dragEndPosition: ICursorPosition

    dragAtomDelta: ICursorPosition = DEFAULT_POSITION

    dragStartToCurrentDelta: ICursorPosition = DEFAULT_POSITION

    dragStartToEndDelta: ICursorPosition = DEFAULT_POSITION

    view: Window = globalThisPolyfill

    constructor(engine: Engine) {
        this.engine = engine
        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            type: observable.ref,
            dragType: observable.ref,
            status: observable.ref,
            position: observable.ref,
            dragStartPosition: observable.ref,
            dragEndPosition: observable.ref,
            dragAtomDelta: observable.ref,
            dragStartToCurrentDelta: observable.ref,
            dragStartToEndDelta: observable.ref,
            view: observable.ref,
            setStyle: action,
            setPosition: action,
            setStatus: action,
            setType: action,
        })
    }

    setStatus(status: CursorStatus) {
        this.status = status
    }

    setType(type: CursorType | string) {
        this.type = type
    }

    setDragType(type: CursorDragType | string) {
        this.dragType = type
    }

    setStyle(style: string) {
    }

    setPosition(position?: ICursorPosition) {
        // console.log(position)
    }

    setDragStartPosition(position?: ICursorPosition) {
    }

    setDragEndPosition(position?: ICursorPosition) {
    }
}