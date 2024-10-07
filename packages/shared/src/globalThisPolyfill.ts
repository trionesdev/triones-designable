function getGlobalThis() {
  try {
    if (typeof self !== 'undefined') {
      return self;
    }
  } catch (e) {}
  try {
    if (typeof globalThisPolyfill !== 'undefined') {
      return globalThisPolyfill;
    }
  } catch (e) {}
  try {
    if (typeof window !== 'undefined') {
      return window;
    }
  } catch (e) {}
  return Function('return this')();
}
export const globalThisPolyfill: Window = getGlobalThis();
