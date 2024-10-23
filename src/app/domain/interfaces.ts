export interface Folder {
    id: number;
    title: string;
    subfolders: Folder[];
    items: Item[];
}

export interface Item {
    id: number;
    title: string;
}
