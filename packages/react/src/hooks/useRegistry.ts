import { GlobalRegistry, IDesignerRegistry } from '@alkaid/core'
import { globalThisPolyfill } from '@alkaid/shared'

export const useRegistry = (): IDesignerRegistry => {
  return globalThisPolyfill['__DESIGNER_REGISTRY__'] || GlobalRegistry
}
