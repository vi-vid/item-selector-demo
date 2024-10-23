import { ItemSelectorFolder } from "../../shared/components/item-selector/item-selector.vm";

export interface MainScreenVM {
    folders: ItemSelectorFolder[];
    isLoading: boolean;
    error: string | null;
}