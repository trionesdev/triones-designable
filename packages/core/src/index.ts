import { globalThisPolyfill } from '@trionesdev/designable-shared';
import * as Core from './exports';

export * from './exports';

if (globalThisPolyfill?.['Designable']?.['Core']) {
  if (module && module.exports) {
    module.exports = {
      __esModule: true,
      ...globalThisPolyfill['Designable']['Core'],
    };
  }
} else {
  globalThisPolyfill['Designable'] = globalThisPolyfill['Designable'] || {};
  globalThisPolyfill['Designable'].Core = Core;
}
