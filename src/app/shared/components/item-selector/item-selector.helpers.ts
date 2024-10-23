import { ItemSelectorFolder, ItemSelectorItem } from "./item-selector.vm";

export function flattenFolders(folders: ItemSelectorFolder[]): ItemSelectorFolder[] {
    const result: ItemSelectorFolder[] = [];
    for (const folder of folders) {
      result.push(folder, ...flattenFolders(folder.subfolders));
    }
    return result;
  }
  
export function flattenFolderItems(folders: ItemSelectorFolder[]): ItemSelectorItem[] {
    const result: ItemSelectorItem[] = [];
    for (const folder of folders) {
        result.push(...flattenFolderItems(folder.subfolders), ...(folder.items));
    }
    return result;
}

export function sortByTitle(a: ItemSelectorFolder | ItemSelectorItem, b: ItemSelectorFolder | ItemSelectorItem): number {
    if(a.title < b.title) { 
        return -1; 
    } else if(a.title > b.title) { 
        return 1; 
    }
    return 0;
}

export function sortByTitleRecursively(folders: ItemSelectorFolder[]): ItemSelectorFolder[] {
    return [...folders].sort(sortByTitle).map((folder) => ({
        ...folder,
        subfolders: sortByTitleRecursively([...folder.subfolders]),
        items: [...folder.items].sort(sortByTitle)
    }));
}

export function isFolderFullySelected(folder: ItemSelectorFolder, selectedIds: Set<number>): boolean {
    return folder.items.every((item) => selectedIds.has(item.id)) && folder.subfolders.every((subfolder) => isFolderFullySelected(subfolder, selectedIds));
}

export function isFolderPartiallySelected(folder: ItemSelectorFolder, selectedIds: Set<number>): boolean {
    return folder.items.some((item) => selectedIds.has(item.id)) || folder.subfolders.some((subfolder) => isFolderPartiallySelected(subfolder, selectedIds));
}
