import {TreeNode} from "../../core";
import {useWorkspace} from "./useWorkspace";

export const useTree = (): TreeNode  => {
    return useWorkspace()?.operation?.tree!
}