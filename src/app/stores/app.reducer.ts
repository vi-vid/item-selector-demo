import { ActionReducerMap } from '@ngrx/store';
import { folderFeatureKey, folderReducer, FolderState } from './folder/folder.reducer';

export interface AppState {
  [folderFeatureKey]: FolderState;
}

export const appReducers: ActionReducerMap<AppState> = {
  [folderFeatureKey]: folderReducer,
};
