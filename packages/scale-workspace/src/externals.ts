import { untracked } from "@formily/reactive";
import { Engine, IEngineProps } from "@alkaid/core";
import { Presets } from "@alkaid/core";
import {
  useFreeSelectionEffect,
  useCursorEffect,
  useViewportEffect,
  useSelectionEffect,
  useKeyboardEffect,
  useAutoScrollEffect,
  useWorkspaceEffect,
  useContentEditableEffect,
  useTranslateEffect,
  useResizeEffect,
} from "@alkaid/core";
import { useDragDropEffect } from "./hooks";
const { DEFAULT_DRIVERS, DEFAULT_SHORTCUTS } = Presets;
const DEFAULT_EFFECTS = [
  useFreeSelectionEffect,
  useCursorEffect,
  useDragDropEffect,
  useViewportEffect,
  useSelectionEffect,
  useKeyboardEffect,
  useAutoScrollEffect,
  useWorkspaceEffect,
  useContentEditableEffect,
  useTranslateEffect,
  useResizeEffect,
];

export const createDesigner = (props: IEngineProps<Engine> = {}) => {
  const drivers = props.drivers || [];
  const effects = props.effects || [];
  const shortcuts = props.shortcuts || [];
  return untracked(
    () =>
      new Engine({
        ...props,
        effects: [...effects, ...DEFAULT_EFFECTS],
        drivers: [...drivers, ...DEFAULT_DRIVERS],
        shortcuts: [...shortcuts, ...DEFAULT_SHORTCUTS],
      })
  );
};
