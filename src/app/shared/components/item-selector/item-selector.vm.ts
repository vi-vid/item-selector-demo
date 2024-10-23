export interface ItemSelectorFolder {
    id: number;
    title: string;
    subfolders: ItemSelectorFolder[];
    items: ItemSelectorItem[];
}

export interface ItemSelectorItem {
    id: number;
    title: string;
}
