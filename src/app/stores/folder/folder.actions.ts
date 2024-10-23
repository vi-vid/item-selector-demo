import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Folder } from '../../domain/interfaces';

export const FolderActions = createActionGroup({
  source: '[Folder]',
  events: {
    'Noop action': emptyProps(),
    'Get folders':  emptyProps(),
    'Get folders success': props<{ folders: Folder[] }>(),
    'Get folders error': props<{ error: string }>(),
  },
});
