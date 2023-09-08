import { useCallback, useEffect, useState } from "react";

export const useWindowScale = (param: {
  designWidth?: number; // 设计稿尺寸
  designHeight?: number;
  width?: number;
  height?: number;
}) => {
  const { width, height, designWidth = 1920, designHeight = 1080 } = param;
  const [scale, setScale] = useState(1);
  const handleResize = useCallback(() => {
    const wrapperWidth = width ?? window.innerWidth;
    const wrapperHeight = height ?? window.innerHeight;
    //根据屏幕的变化适配的比例
    const scale =
      wrapperWidth / wrapperHeight < designWidth / designHeight
        ? wrapperWidth / designWidth
        : wrapperHeight / designHeight;
    setScale(scale);
  }, [designHeight, designWidth, height, width]);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, [handleResize, width]);
  useEffect((): (() => void) | void => {
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
  return {
    scale,
  };
};
