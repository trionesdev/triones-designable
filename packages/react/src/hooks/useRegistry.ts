import { GlobalRegistry, IDesignerRegistry } from '@trionesdev/designable-core';
import { globalThisPolyfill } from '@trionesdev/designable-shared';

export const useRegistry = (): IDesignerRegistry => {
  return globalThisPolyfill['__DESIGNER_REGISTRY__'] || GlobalRegistry;
};
