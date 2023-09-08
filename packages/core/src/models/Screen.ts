import { Engine } from "./Engine";
import { action, define, observable } from "@formily/reactive";
import { Rect } from "@alkaid/shared";

export enum ScreenType {
  PC = "PC",
  Responsive = "Responsive",
  Mobile = "Mobile",
  Sketch = "Sketch",
  Scale = "Scale", //缩放画布
}

export enum ScreenStatus {
  Normal = "Normal",
  Resizing = "Resizing",
  Zooming = "Zooming",
}

export const DEFAULT_SCALE_SIZE = {
  width: 1000,
  height: 1000,
};

export class Screen {
  type: ScreenType;
  scale = 1;
  width: number | string = "100%";
  height: number | string = "100%";
  engine: Engine;
  background = "";
  flip = false;
  status = ScreenStatus.Normal;
  contentRect: Rect; //缩放时候的容器Rect信息
  constructor(engine: Engine) {
    this.engine = engine;
    this.type = engine.props.defaultScreenType;
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      type: observable.ref,
      scale: observable.ref,
      width: observable.ref,
      height: observable.ref,
      status: observable.ref,
      flip: observable.ref,
      background: observable.ref,
      contentRect: observable.ref,
      setType: action,
      setScale: action,
      setSize: action,
      resetSize: action,
      setBackground: action,
      setFlip: action,
    });
  }

  setStatus(status: ScreenStatus) {
    this.status = status;
  }

  setType(type: ScreenType) {
    this.type = type;
  }

  setScale(scale: number) {
    this.scale = scale;
  }
  setContentRect(contentRect: Rect) {
    this.contentRect = contentRect;
  }
  setSize(width?: number | string, height?: number | string) {
    if (width) {
      this.width = width;
    }
    if (height) {
      this.height = height;
    }
  }

  resetSize() {
    this.width =
      this.type === ScreenType.Scale ? DEFAULT_SCALE_SIZE.width : "100%";
    this.height =
      this.type === ScreenType.Scale ? DEFAULT_SCALE_SIZE.height : "100%";
  }

  setBackground(background: string) {
    this.background = background;
  }

  setFlip(flip: boolean) {
    this.flip = flip;
  }
}
