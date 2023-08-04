import {useDesigner} from "./useDesigner";

export const useWorkspace = (id?: string) => {
    const designer = useDesigner()
    return designer?.workbench?.currentWorkspace
}