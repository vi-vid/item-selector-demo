import { createFeatureSelector, createSelector } from '@ngrx/store';
import { folderFeatureKey, FolderState } from './folder.reducer';

export const selectFeature = createFeatureSelector<FolderState>(folderFeatureKey);

const selectFolders$ = createSelector(selectFeature, (state) => state.folders);
const selectIsLoading$ = createSelector(selectFeature, (state) => state.isLoading);
const selectError$ = createSelector(selectFeature, (state) => state.error);

export const fromFolder = {
    selectFolders$,
    selectIsLoading$,
    selectError$,
};
