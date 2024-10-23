import { createReducer, on } from '@ngrx/store';
import { FolderActions } from './folder.actions';
import { Folder } from '../../domain/interfaces';

export const folderFeatureKey = 'folder';

export interface FolderState {
  folders: Folder[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FolderState = {
  folders: null,
  isLoading: false,
  error: null
};

export const folderReducer = createReducer(
  initialState,
  on(
    FolderActions.getFolders,
    (state): FolderState => {
      return {
        ...state,
        isLoading: true
      };
    }
  ),
  on(
    FolderActions.getFoldersSuccess,
    (state, { folders }): FolderState => {
      return {
        ...state,
        folders,
        isLoading: false
      };
    }
  ),
  on(
    FolderActions.getFoldersError,
    (state, { error }): FolderState => {
      return {
        ...state,
        error,
        isLoading: false
      };
    }
  ),
);
