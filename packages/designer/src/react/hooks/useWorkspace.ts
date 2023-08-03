import {useDesigner} from "./useDesigner";

export const useWorkspace = () => {
    const designer = useDesigner()
    return designer?.workbench?.workspace
}