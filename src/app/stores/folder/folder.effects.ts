import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { FolderActions } from "./folder.actions";
import { Folder, Item } from "../../domain/interfaces";

type Table<T extends string> = {
    columns: T[];
    data: (string | number | null)[][];
};

type FolderTable = Table<'id' | 'title' | 'parent_id'>;

type ItemTable = Table<'id' | 'title' | 'folder_id'>;

interface FolderResponse {
    folders: FolderTable;
    items: ItemTable;
};

@Injectable()
export class ItemEffects {
    private readonly http = inject(HttpClient);
    private readonly actions$ = inject(Actions);

    public getItems$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(FolderActions.getFolders),
            concatMap(() => {
                return this.http.get('/response.json').pipe(
                    map((data) => {
                        return FolderActions.getFoldersSuccess({ folders: this.mapFolderResponseApiToDomain(data as FolderResponse) });
                    }),
                    catchError((error) => {
                        console.error(error);
                        return of(FolderActions.getFoldersError({ error: 'something went wrong during the request' }));
                    })
                );
            })
        );
    });

    private mapFolderResponseApiToDomain(data: FolderResponse): Folder[] {
        const folderMap: { [id: number]: Folder } = {};
        const rootFolders: Folder[] = [];
        
        const folderIdIndex = data.folders.columns.indexOf('id');
        const folderTitleIndex = data.folders.columns.indexOf('title');
        const folderParentIdIndex = data.folders.columns.indexOf('parent_id');

        const itemIdIndex = data.items.columns.indexOf('id');
        const itemTitleIndex = data.items.columns.indexOf('title');
        const itemFolderIdIndex = data.items.columns.indexOf('folder_id');

        if (folderIdIndex < 0 || folderTitleIndex < 0 || folderParentIdIndex < 0 || itemIdIndex < 0 || itemTitleIndex < 0 || itemFolderIdIndex < 0) {
            throw new Error('mapping error occured');
        }


        data.folders.data.forEach(folderData => {
            const folder: Folder = {
                id: folderData[folderIdIndex] as number,
                title: folderData[folderTitleIndex] as string,
                subfolders: [],
                items: []
            };
            folderMap[folder.id] = folder;

            if ( folderData[folderParentIdIndex] === null) {
                rootFolders.push(folder);
            }
        });

        data.folders.data.forEach(folderData => {
            const folderId = folderData[folderIdIndex] as number;
            const parentId = folderData[folderParentIdIndex] as number;
            
            if (parentId !== null && folderMap[parentId]) {
                folderMap[parentId].subfolders.push(folderMap[folderId]);
            }
        });

        data.items.data.forEach(itemData => {
            const item: Item = {
                id: itemData[itemIdIndex] as number,
                title: itemData[itemTitleIndex] as string,
            };

            if (folderMap[itemData[itemFolderIdIndex] as number]) {
                folderMap[itemData[itemFolderIdIndex] as number].items.push(item);
            }
        });

        return rootFolders;
    }
}
